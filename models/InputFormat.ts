export interface ResultObject {
  name: string;
  description?: string;
  columns: string[];
  dataset: string;
}

export interface Cell {
  name: string;
  sheetName: string;
  cell: string;
}

export interface Dataset {
  name: string;
  sheetName: string;
  range: string;
}

export interface DefaultSettings {
  dataTypes?: {
    String: { size: number };
    Decimal: { size: number; precision: number };
  };
  columns?: [
    {
      name: string;
      dbColumnType: string;
    }
  ];
}
export interface InputFormat {
  domain: string;
  fileName: string;
  fileOptions: {};
  description?: string;
  resultObjects: ResultObject[];
  cells?: Cell[];
  datasets?: Dataset[];
  defaultSettings?: DefaultSettings;
}

export type ExcelDataType = 'b' | 'n' | 'e' | 's' | 'd' | 'z';
