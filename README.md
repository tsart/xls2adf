![](https://badgen.net/npm/v/@tsart/xls2adf)
![](https://badgen.net/npm/types/@tsart/xls2adf)

# xls2adf

Excel file loader with additional meta objects that you can instantly use in Azure Data Factory pipelines.

## Install

```bash
npm install @tsart/xls2adf
```

## Usage

```typescript
import * as parser from '@tsart/xls2adf';

let blob: any = fs.readFileSync('test.xls');
let files: parser.OutputFormat[] = parser.parseXLSX(config, blob);
```

See `__test__` folder for good samples.

## Config schema

This sample config defines `A1`, `A2` cells and `B4:C7` range to extract as JSON object.

```yml
domain: excel
fileName: test.xls
fileOptions:
  cellDates: true

# Destination
resultObjects:
  - name: testDS
    columns:
      - ReportDate
      - ReportTitle
    dataset: Table

# Excel cells definitions
cells:
  - name: ReportDate
    sheetName: Sheet1
    cell: A1
  - name: ReportTitle
    sheetName: Sheet1
    cell: A2

# Excel datasets definitions
datasets:
  - name: Table
    sheetName: Sheet1
    range: B4:C7
```

## Credits

Thank you [daikiueda](https://github.com/daikiueda/xls2adf) for sample Excel files and a few good insights
