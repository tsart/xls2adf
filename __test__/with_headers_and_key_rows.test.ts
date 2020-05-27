import * as parser from '../parser';
import * as fs from 'fs';
import { InputFormat } from '../models/InputFormat';
import { OutputFormat } from '../models/OutputFormat';

let config: InputFormat = {
  domain: 'Excel',
  fileName: '__test__/xlsx/with_header_information_and_keys_row.xlsx',
  fileOptions: { cellDates: true },
  description: 'source description',
  resultObjects: [
    {
      name: 'withHeaderInformationAndKeysRow',
      columns: ['ReportTitle', 'ReportDate'],
      dataset: 'Table',
      description: 'recordset description',
    },
  ],
  cells: [
    { name: 'ReportTitle', sheetName: 'Sheet1', cell: 'A1' },
    { name: 'ReportDate', sheetName: 'Sheet1', cell: 'E1' },
  ],
  datasets: [{ name: 'Table', sheetName: 'Sheet1', range: 'A3:C5' }],
};

describe('Excel parser', () => {
  it('should return defined file object', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    expect(blob.length).toBeGreaterThan(0);
  });
  it('should return defined JSON object', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res).toBeDefined();
    expect(res.length).toBe(1);
  });
  it('should return defined JSON object with data', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].data).toStrictEqual([
      {
        ReportDate: new Date('2020-05-19T12:00:00.000Z'),
        ReportTitle: 'Title',
        'column B': 'value 1-B',
        'column-C': 'value 1-C',
        columnA: 'value 1-A',
      },
      {
        ReportDate: new Date('2020-05-19T12:00:00.000Z'),
        ReportTitle: 'Title',
        'column B': 'value 2-B',
        'column-C': 'value 2-C',
        columnA: 'value 2-A',
      },
    ]);
  });
  it('should return defined JSON object with metadata', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].columns.map((item) => item.name)).toStrictEqual([
      'ReportTitle',
      'ReportDate',
      'columnA',
      'column B',
      'column-C',
    ]);
  });
  it('should return column types', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].columns.find((col) => col.name === 'ReportDate').type).toBe('DateTime');
    expect(res[0].columns.find((col) => col.name === 'column-C').type).toBe('String');
  });
  it('should return source description', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].source.description).toBe('source description');
  });
  it('should return recordset description', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].description).toBe('recordset description');
  });
  it('should return ADF data mapping', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].dataMapping.type).toBe('TabularTranslator');
    expect(res[0].dataMapping.collectionReference).toBe("$['data']");
    expect(res[0].dataMapping.mapComplexValuesToString).toBe(true);
    expect(res[0].dataMapping.mappings.map((i) => i.sink.name)).toStrictEqual([
      'ReportTitle',
      'ReportDate',
      'columnA',
      'column B',
      'column-C',
      'dwSource',
      'dwSnapshotOn',
    ]);
    expect(res[0].dataMapping.mappings.map((i) => i.source.path)).toStrictEqual([
      "['ReportTitle']",
      "['ReportDate']",
      "['columnA']",
      "['column B']",
      "['column-C']",
      "$['source']",
      "$['timestamp']",
    ]);
  });
  it('should return ADF DDL PreCopyScript', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].ddlPreCopyScript).toBe(
      `IF SCHEMA_ID('{{schemaName}}') IS NULL EXEC ('CREATE SCHEMA [{{schemaName}}]'); IF OBJECT_ID('[{{schemaName}}].[{{tableName}}]') IS NULL CREATE TABLE [{{schemaName}}].[{tableName}}] ([ReportTitle] nvarchar(255),[ReportDate] datetime,[columnA] nvarchar(255),[column B] nvarchar(255),[column-C] nvarchar(255), [dwSource] varchar(1000), [dwSnapshotOn] DateTime); DELETE FROM [{{schemaName}}].[{{tableName}}] WHERE dwSnapshotOn = '{{timestamp}}';`
    );
  });
});
