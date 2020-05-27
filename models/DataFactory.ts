export type ADFColumnType =
  | 'Byte[]'
  | 'Boolean'
  | 'DateTime'
  | 'DateTimeOffset'
  | 'Decimal'
  | 'Double'
  | 'Guid'
  | 'Int16'
  | 'Int32'
  | 'Int64'
  | 'Object'
  | 'Single'
  | 'String'
  | 'TimeSpan'
  | 'Xml';

export interface MappingItem {
  source: {
    path: string;
  };
  sink: {
    name: string;
    type: ADFColumnType;
  };
}

export interface Mapping {
  type: 'TabularTranslator';
  mappings: MappingItem[];
  collectionReference?: string;
  mapComplexValuesToString?: boolean;
}
