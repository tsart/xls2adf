import { utils, WorkBook } from 'xlsx';
import { ExcelDataType, Cell, Dataset } from '../../models/InputFormat';
import { Column } from '../../models/OutputFormat';
import { getColumnType } from './converters';
import { rename, removeSymbols } from '../../utils/rename';

export const readCell = (wb: WorkBook, options: Cell) => {
  let res: any = wb.Sheets[options.sheetName][options.cell].v;
  return res;
};

export const readDataset = (wb: WorkBook, options: Dataset) => {
  let res: any[] = utils.sheet_to_json(wb.Sheets[options.sheetName], { range: options.range });
  return res;
};

export const readCellMeta = (wb: WorkBook, options: Cell) => {
  let cellType: ExcelDataType = wb.Sheets[options.sheetName][options.cell].t;
  let res: Column = {
    name: options.name,
    type: getColumnType(cellType),
    isNullable: true,
  };
  return res;
};

export const readDatasetMeta = (wb: WorkBook, options: Dataset) => {
  let sheet = wb.Sheets[options.sheetName];

  let range = String(options.range).includes(':')
    ? utils.decode_range(options.range)
    : utils.decode_range(sheet['!ref']);
  let offset: number = String(options.range).includes(':') ? 0 : Number(options.range);

  let res: Column[] = [];
  for (var C = range.s.c; C <= range.e.c; ++C) {
    let cell = sheet[utils.encode_cell({ r: range.s.r + offset + 1, c: C })];
    let cellType: ExcelDataType = cell ? cell.t : 's';
    let columnName: string = removeSymbols(sheet[utils.encode_cell({ r: range.s.r + offset, c: C })].v);
    res.push({
      name: columnName,
      type: getColumnType(cellType),
      isNullable: true,
    });
  }
  // rename duplicate columns
  let columns: string[] = rename(res.map((item) => item.name));
  res.forEach((item, index) => (item.name = columns[index]));

  return res;
};
