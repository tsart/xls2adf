export const rename = (arr: string[]) => {
  var dup_count, new_name;
  arr.forEach((item: string, index) => {
    dup_count = arr.filter((x) => x == item).length;
    if (dup_count > 1) {
      for (let n: number = 0; n < dup_count; ) {
        do {
          new_name = `${item}(${(n += 1)})`;
        } while (arr.includes(new_name));
        arr[arr.indexOf(item)] = new_name;
      }
    }
  });
  return arr;
};

export const removeSymbols = (s: string) => {
  return s.replace(/([^a-zA-Z0-9_\:\/\'\"\|\s\.\!\&\,\-\+\(\)\@\#\$\%\^\*\;\\\?\=])/g, '');
};
