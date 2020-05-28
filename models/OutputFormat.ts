import { ADFColumnType, Mapping } from './DataFactory';
import { DefaultSettings } from './InputFormat';

export interface Column {
  name: string;
  type: ADFColumnType;
  isNullable: boolean;
  description?: string;
  size?: number;
  precision?: number;
}


export interface OutputFormat {
  domain: string;
  objectName: string;
  description?: string;
  source: {
    type: string;
    fileName: string;
    description?: string;
  };
  timestamp: Date;
  columns: Column[];
  dataMapping?: Mapping;
  metaMapping?: Mapping;
  defaultSettings: DefaultSettings;
  ddlPreCopyScript: string;
  dataFile?: string;
  data?: any[];
}
