import { ADFColumnType, Mapping, MappingItem } from '../../models/DataFactory';
import { OutputFormat, Column } from '../../models/OutputFormat';
import { DefaultSettings } from '../../models/InputFormat';
import { ADFTypeMapping } from '../../models/ADFTypeMapping';
import { ddlColumn } from '../../models/DBTypeMapping';
import { DBColumnType } from '../../models/SqlDB';

export const ddlPreCopyScript = (defaults: DefaultSettings, columns: Column[]): string => {
  let dbColumns: string[] = [];
  columns.forEach((column) => {
    // convert to dbColumn format
    // get default type if defined
    let dbColumn: string;
    let defaultColumn: { name: string; dbColumnType: string } = defaults.columns?.find(
      (item) => item.name === column.name
    );
    if (defaultColumn) {
      dbColumn = `[${column.name}] ${defaultColumn.dbColumnType}`;
    } else {
      let size: number | undefined = column.size === undefined ? defaults.dataTypes[column.type]?.size : column.size;
      let precision: number | undefined =
        column.precision === undefined ? defaults.dataTypes[column.type]?.precision : column.precision;
      let dbColumnType: DBColumnType = ADFTypeMapping(column.type);
      dbColumn = `[${column.name}] ${ddlColumn(dbColumnType, size, precision)}`;
    }
    dbColumns.push(dbColumn);
  });
  let res: string = `IF SCHEMA_ID('{{schemaName}}') IS NULL EXEC ('CREATE SCHEMA [{{schemaName}}]'); IF OBJECT_ID('[{{schemaName}}].[{{tableName}}]') IS NULL CREATE TABLE [{{schemaName}}].[{{tableName}}] (${dbColumns}, [dwSource] varchar(1000), [dwSnapshotOn] DateTime); DELETE FROM [{{schemaName}}].[{{tableName}}] WHERE dwSnapshotOn = '{{timestamp}}';`;
  return res;
};
