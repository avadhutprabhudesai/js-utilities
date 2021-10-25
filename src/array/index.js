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
