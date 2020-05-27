import { rename, removeSymbols } from '../utils/rename';

describe('Configuration tests', () => {
  it('should return renamed string[] array', async () => {
    let value: string = 'a(1)_[234]  {dd}/-11S@';
    expect(removeSymbols(value)).toBe('a(1)_234  dd/-11S@');
  });
  it('should return renamed string[] array', async () => {
    let arr = ['a(1)', 'a(6)', 'a(6)', 'a', 'a'];
    expect(rename(arr)).toStrictEqual(['a(1)', 'a(6)(1)', 'a(6)(2)', 'a(2)', 'a']);
  });
  it('should return renamed object', async () => {
    let res = [
      { name: 'a', type: 1 },
      { name: 'a', type: 2 },
      { name: 'b', type: 3 },
      { name: 'a', type: 4 },
    ];
    // rename duplicate columns
    let columns: string[] = rename(res.map((item) => item.name));
    res.forEach((item, index) => (item.name = columns[index]));

    expect(res).toStrictEqual([
      { name: 'a(1)', type: 1 },
      { name: 'a(2)', type: 2 },
      { name: 'b', type: 3 },
      { name: 'a(3)', type: 4 },
    ]);
  });
});
