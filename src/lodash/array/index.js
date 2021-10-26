export const chunk = (arr, size = 1) => {
  if (size === 0) return [];
  return arr.reduce((res, val, idx, array) => {
    return idx === 0 || idx % size === 0
      ? [...res, array.slice(idx, idx + size)]
      : res;
  }, []);
};

export const compact = (arr) => arr.filter((a) => a);

export const concat = (arr, ...values) => {
  return [
    ...arr,
    ...values.reduce(
      (acc, val) => (Array.isArray(val) ? [...acc, ...val] : [...acc, val]),
      []
    ),
  ];
};

export const difference = (arr, values) =>
  arr.reduce((acc, val) => (!values.includes(val) ? [...acc, val] : acc), []);

export const differenceBy = (arr, values, iteratee) => {
  if (!(iteratee && typeof iteratee === 'function')) {
    return difference(arr, values);
  }
  return arr.reduce(
    (acc, val) =>
      !values.map(iteratee).includes(iteratee(val)) ? [...acc, val] : acc,
    []
  );
};

export const differenceWith = (arr, values, comparator) => {
  if (!(comparator && typeof comparator === 'function')) {
    return difference(arr, values);
  } else {
    return arr.reduce(
      (acc, val) =>
        !values.some((v) => comparator(val, v)) ? [...acc, val] : acc,
      []
    );
  }
};

export const drop = (arr, n = 1) => arr.slice(0 + n);

export const dropRight = (arr, n = 1) => arr.slice(0, arr.length - n);

export const dropWhile = (arr, pred = (x) => x) =>
  arr.reduce((acc, val) => {
    if (!acc.length) {
      if (!pred(val)) {
        return [...acc, val];
      }
      return acc;
    } else {
      return [...acc, val];
    }
  }, []);

export const dropRightWhile = (arr, pred = (x) => x) =>
  dropWhile(arr.reverse(), pred).reverse();

export const fill = (arr, value, start = 0, end = arr.length) => {
  arr.map((e, idx) => {
    if (idx >= start && idx < end) {
      arr[idx] = value;
    }
  });
};

// @TODO: Add logic for obejcts
export const find = (arr, pred = (x) => x, fromIndex = 0) =>
  arr.find((val, idx) => {
    if (idx >= fromIndex) {
      return pred(val);
    }
  });

// @TODO: Add logic for obejcts
export const findIndex = (arr, pred = (x) => x, fromIndex = 0) =>
  arr.findIndex((val, idx) => {
    if (idx >= fromIndex) {
      return pred(val);
    }
  });

// @TODO: Add logic for obejcts
export const findLastIndex = (
  arr,
  pred = (x) => x,
  fromIndex = arr.length - 1
) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (i <= fromIndex && pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

export const flatten = (arr = []) => arr.flat();

export const flattenDeep = (arr = []) =>
  arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return [...acc, ...flattenDeep(val)];
    }
    return [...acc, val];
  }, []);

export const flattenDepth = (arr = [], depth = 1) => {
  const flatDeep = (arr, depth) => {
    var result = arr;
    while (depth > 0) {
      depth--;
      result = flatten(result);
    }
    return result;
  };
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      let flattenedVal = flatDeep(val, depth - 1);
      return [...acc, ...flattenedVal];
    }
    return [...acc, val];
  }, []);
};

export const fromPairs = (pairs = []) => {
  return pairs.reduce((acc, val) => {
    if (Array.isArray(val) && val.length === 2) {
      return {
        ...acc,
        [val[0]]: val[1],
      };
    }
    return acc;
  }, {});
};
export const initial = (arr = []) => {
  return arr.slice(0, arr.length - 1);
};

export const intersection = (...arrs) =>
  !arrs.length
    ? []
    : arrs[0].filter((ref) =>
        arrs
          .slice(1, arrs.length)
          .every((nextArr) => nextArr.some((n) => n === ref))
      );

export const intersectionBy = (...params) => {
  if (!params.length) return [];
  const arrs = params.slice(0, params.length - 1);
  const iteratee = params[params.length - 1];
  if (!arrs.length) return [];
  return arrs[0].filter((el) =>
    arrs
      .slice(1, arrs.length)
      .every((nextArr) => nextArr.some((n) => iteratee(n) === iteratee(el)))
  );
};

export const intersectionWith = (...params) => {
  if (!params.length) return [];
  const arrs = params.slice(0, params.length - 1);
  const comparator = params[params.length - 1];
  if (!arrs.length) return [];
  return arrs[0].filter((el) =>
    arrs
      .slice(1, arrs.length)
      .every((nextArr) => nextArr.some((n) => comparator(el, n)))
  );
};

export const pull = (arr = [], ...values) => {
  for (let i = 0; i < arr.length; i++) {
    if (values.includes(arr[i])) {
      arr.splice(i, 1);
      i--;
    }
  }
};

export const pullAll = (arr = [], values) => {
  for (let i = 0; i < arr.length; i++) {
    if (values.includes(arr[i])) {
      arr.splice(i, 1);
      i--;
    }
  }
};

export const pullAllBy = (arr = [], values, iteratee) => {
  for (let i = 0; i < arr.length; i++) {
    if (values.map(iteratee).includes(iteratee(arr[i]))) {
      arr.splice(i--, 1);
    }
  }
};

export const pullAllWith = (arr, values, comparator) => {
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    if (values.some((v) => comparator(x, v))) {
      arr.splice(i--, 1);
    }
  }
};

export const pullAt = (arr, indexes) => {
  var removed = [],
    pos = [];
  for (let i = 0; i < indexes.length; i++) {
    const idx = indexes[i];
    if (idx < arr.length) {
      removed.push(arr[idx]);
      arr.splice(idx, 1, undefined);
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      arr.splice(i--, 1);
    }
  }
  return removed.concat(
    new Array(indexes.length - removed.length).fill(undefined)
  );
};

export const join = (arr = [], separator = ',') => arr.join(separator);

export const last = (arr = []) => arr[arr.length - 1];

export const nth = (arr = [], n = 0) => {
  return n < arr.length ? arr[n < 0 ? arr.length - 1 + n : n] : undefined;
};

export const remove = (arr = [], pred) => {
  var removed = [];
  for (let i = 0; i < arr.length; i++) {
    if (pred(arr[i])) {
      removed.push(arr[i]);
      arr.splice(i, 1, undefined);
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      arr.splice(i--, 1);
    }
  }
  return removed;
};
