export function arrayMove(arr: any[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);

    return arr;
};

export function sortArraytBy(arr: any, values: any, prop: string | number) {
    var top = [];
    var rest = [];

    for (var el of arr) {  
      if (values.includes(el[prop])) {
          top.push(el)
      } else {
          rest.push(el);
      }
    }

    return top.concat(rest);
  };
  