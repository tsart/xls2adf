import { ADFColumnType, Mapping, MappingItem } from '../../models/DataFactory';
import { OutputFormat, Column } from '../../models/OutputFormat';

export const dataMapping = (columns: Column[]): Mapping => {
  let res: Mapping = {
    type: 'TabularTranslator',
    mapComplexValuesToString: true,
    collectionReference: "$['data']",
    mappings: [],
  };
  columns.forEach((column) => {
    let m: MappingItem = {
      source: { path: `['${column.name}']` },
      sink: { name: column.name, type: column.type },
    };
    res.mappings.push(m);
  });
  // add internal columns
  res.mappings.push({ source: { path: "$['source']" }, sink: { name: 'dwSource', type: 'String' } });
  res.mappings.push({ source: { path: "$['timestamp']" }, sink: { name: 'dwSnapshotOn', type: 'DateTime' } });
  return res;
};

export const metaMapping = (): Mapping => {
  let res: Mapping = {
    type: 'TabularTranslator',
    mapComplexValuesToString: true,
    mappings: [],
  };
  // add meta columns
  res.mappings.push({ source: { path: "$['domain']" }, sink: { name: 'domain', type: 'String' } });
  res.mappings.push({ source: { path: "$['objectName']" }, sink: { name: 'objectName', type: 'String' } });
  res.mappings.push({ source: { path: "$['source']['type']" }, sink: { name: 'sourceType', type: 'String' } });
  res.mappings.push({ source: { path: "$['source']['fileName']" }, sink: { name: 'sourceFileName', type: 'String' } });
  res.mappings.push({ source: { path: "$['timestamp']" }, sink: { name: 'timestamp', type: 'DateTime' } });
  return res;
};
