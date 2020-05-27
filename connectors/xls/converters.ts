import { ExcelDataType } from '../../models/InputFormat';
import { ADFColumnType } from '../../models/DataFactory';

export const getColumnType = (cellType: ExcelDataType) => {
  /**
   * The Excel data type for a cell.
   * b Boolean, n Number, e error, s String, d Date, z Stub
   */
  let type: ADFColumnType =
    cellType === 'd'
      ? 'DateTime'
      : cellType === 's'
      ? 'String'
      : cellType === 'b'
      ? 'Boolean'
      : cellType === 'n'
      ? 'Decimal'
      : 'String';
  return type;
};
