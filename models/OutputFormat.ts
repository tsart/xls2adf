import { ADFColumnType, Mapping } from './DataFactory';

export interface Column {
  name: string;
  type: ADFColumnType;
  isNullable: boolean;
  description?: string;
  size?: number;
  precision?: number;
}

export interface DefaultSettings {
  dataTypes: {
    String: { size: number };
    Decimal: { size: number; precision: number };
  };
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
  data: any[];
}
