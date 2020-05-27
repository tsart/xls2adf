import { DBColumnType } from './SqlDB';
import { ADFColumnType } from './DataFactory';

export const ADFTypeMapping = (type: ADFColumnType): DBColumnType => {
  // SQL Server data type	  Azure Data Factory interim data type
  let res: DBColumnType =
    type === 'Int64'
      ? 'bigint'
      : type === 'Byte[]'
      ? 'varbinary'
      : type === 'Boolean'
      ? 'bit'
      : type === 'String'
      ? 'nvarchar'
      : type === 'DateTime'
      ? 'datetime'
      : type === 'DateTimeOffset'
      ? 'datetimeoffset'
      : type === 'Decimal'
      ? 'numeric'
      : type === 'Double'
      ? 'float'
      : type === 'Int32'
      ? 'int'
      : type === 'Single'
      ? 'real'
      : type === 'Int16'
      ? 'smallint'
      : type === 'Object'
      ? 'sql_variant'
      : type === 'TimeSpan'
      ? 'time'
      : type === 'Guid'
      ? 'uniqueidentifier'
      : type === 'Xml'
      ? 'xml'
      : 'varchar';
  return res;
};
