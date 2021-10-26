/**
 * Implement following methods usind reduce
 * 1. map
 * 2. filter
 * 3. find
 * 4. findIndex
 * 5. every
 * 6. some
 * 7. includes
 * 8.
 */

export const map = (arr, transform) =>
  arr.reduce((acc, val) => [...acc, transform(val)], []);

export const filter = (arr, pred) =>
  arr.reduce((acc, val) => (pred(val) ? [...acc, val] : acc), []);

export const find = (arr, pred) =>
  arr.reduce((acc, val) => {
    if (!acc && pred(val)) {
      return val;
    }
    return acc;
  }, undefined);
