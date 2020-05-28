import { read, WorkBook } from 'xlsx';
import * as fs from 'fs';
import { Settings } from './connectors/config';
import { InputFormat, ResultObject, Dataset, Cell, ExcelDataType } from './models/InputFormat.js';
import { OutputFormat } from './models/OutputFormat.js';
import { readDataset, readDatasetMeta, readCell, readCellMeta } from './connectors/xls/readers';
import { dataMapping, metaMapping } from './connectors/adf/dfMapping';
import { ddlPreCopyScript } from './connectors/adf/ddlScript';

export const parseXLSX = (config: InputFormat, inputBlob: any): OutputFormat[] => {
  let Output: OutputFormat[] = [];
  let settings = new Settings(config);
  let fileOptions = settings.getFileOptions();
  const wb: WorkBook = read(inputBlob, fileOptions);

  let objectList: any[] = settings.getObjectList();
  objectList.forEach((object: ResultObject) => {
    let res: OutputFormat = {
      domain: settings.getDomainOptions(),
      objectName: object.name,
      description: object.description,
      timestamp: new Date(),
      source: { type: 'Excel', fileName: config.fileName, description: config.description },
      columns: [],
      defaultSettings: config.defaultSettings,
      ddlPreCopyScript: '',
      data: [],
    };
    let dataset = {};
    let meta = [];
    object.columns?.forEach((cellName) => {
      let options = settings.getCellOptions(cellName);
      dataset[cellName] = readCell(wb, options);
      meta.push(readCellMeta(wb, options));
    });

    let options = settings.getDatasetOptions(object.dataset);
    let data = readDataset(wb, options);
    let metaDS = readDatasetMeta(wb, options);
    res.data = data.map((row) => {
      return { ...dataset, ...row };
    });
    res.columns = [...meta, ...metaDS];

    res.dataMapping = dataMapping(res.columns);
    res.metaMapping = metaMapping();
    res.ddlPreCopyScript = ddlPreCopyScript(res.defaultSettings, res.columns);

    Output.push(res);
  });
  return Output;
};
