import { DBColumnType } from './SqlDB';
import { ADFColumnType } from './DataFactory';

export const DBTypeMapping = (type: DBColumnType): ADFColumnType => {
  // SQL Server data type	  Azure Data Factory interim data type
  let res: ADFColumnType =
    type === 'bigint'
      ? 'Int64'
      : type === 'binary'
      ? 'Byte[]'
      : type === 'bit'
      ? 'Boolean'
      : type === 'char'
      ? 'String'
      : type === 'date'
      ? 'DateTime'
      : type === 'datetime'
      ? 'DateTime'
      : type === 'datetime2'
      ? 'DateTime'
      : type === 'datetimeoffset'
      ? 'DateTimeOffset'
      : type === 'decimal'
      ? 'Decimal'
      : type === 'FILESTREAM'
      ? 'Byte[]'
      : type === 'float'
      ? 'Double'
      : type === 'image'
      ? 'Byte[]'
      : type === 'int'
      ? 'Int32'
      : type === 'money'
      ? 'Decimal'
      : type === 'nchar'
      ? 'String'
      : type === 'ntext'
      ? 'String'
      : type === 'numeric'
      ? 'Decimal'
      : type === 'nvarchar'
      ? 'String'
      : type === 'real'
      ? 'Single'
      : type === 'rowversion'
      ? 'Byte[]'
      : type === 'smalldatetime'
      ? 'DateTime'
      : type === 'smallint'
      ? 'Int16'
      : type === 'smallmoney'
      ? 'Decimal'
      : type === 'sql_variant'
      ? 'Object'
      : type === 'text'
      ? 'String'
      : type === 'time'
      ? 'TimeSpan'
      : type === 'timestamp'
      ? 'Byte[]'
      : type === 'tinyint'
      ? 'Int16'
      : type === 'uniqueidentifier'
      ? 'Guid'
      : type === 'varbinary'
      ? 'Byte[]'
      : type === 'varchar'
      ? 'String'
      : type === 'xml'
      ? 'Xml'
      : 'String';
  return res;
};

export const ddlColumn = (type: DBColumnType, size?: number, precision?: number): string => {
  let res: string;
  res =
    ['nvarchar', 'varchar'].indexOf(type) > -1
      ? `${type}(${size === -1 ? 'max' : size})`
      : ['numeric'].indexOf(type) > -1
      ? `${type}(${size}, ${precision})`
      : type;
  return res;
};
