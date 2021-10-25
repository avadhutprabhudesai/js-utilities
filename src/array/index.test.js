import {
  chunk,
  compact,
  concat,
  difference,
  differenceBy,
  differenceWith,
  drop,
  dropRight,
  dropRightWhile,
  dropWhile,
} from '.';
import { negate } from '../lodash/function';

const isEven = (x) => x % 2 === 0;
const isOdd = negate(isEven);
const gte = (l, r) => l >= r;

describe('Testing lodash/chunk', () => {
  it('should return an array', () => {
    expect(Array.isArray(chunk([1, 2, 3, 4], 1))).toBeTruthy();
  });
  it('should return an empty array when size is 0 ', () => {
    expect(chunk([1, 2, 3, 4], 0)).toEqual([]);
  });
  it('should return an array containing chunk-sized arrays', () => {
    expect(chunk([1, 2], 1)).toEqual([[1], [2]]);
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });
  it('should have a last chunk with remaining elements if input array cannot be split evenly ', () => {
    expect(chunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]]);
  });
});

describe('Testing lodash/compact', () => {
  it('should return an array', () => {
    expect(Array.isArray(compact([1, 2, 3, 4]))).toBeTruthy();
  });
  it('should return a blank array if input is blank array', () => {
    expect(compact([])).toEqual([]);
  });
  it('should remove all falsy values', () => {
    expect(compact([1, 0, false, 2, '', NaN, 3, undefined, 4, null])).toEqual([
      1, 2, 3, 4,
    ]);
  });
});

describe('Testing lodash/concat', () => {
  it('should return an array', () => {
    expect(Array.isArray(concat([], 1, 2))).toBeTruthy();
  });
  it('should concat given values to the input array', () => {
    expect(concat([1, 2], 3, 4)).toEqual([1, 2, 3, 4]);
  });
  it('should flatten and concat arrays, if any, in the given values to the input array', () => {
    expect(concat([1, 2], 3, [4], [[5]])).toEqual([1, 2, 3, 4, [5]]);
  });
});

describe('Testing lodash/difference', () => {
  it('should return an array', () => {
    expect(Array.isArray(difference([1, 2], [2, 4]))).toBeTruthy();
  });
  it('should return an array of all values from input array which are not present in values', () => {
    expect(difference([1, 2], [2, 4])).toEqual([1]);
    expect(difference([1, 2, undefined, null, NaN], [2, 4, null, NaN])).toEqual(
      [1, undefined]
    );
    expect(difference([1, 2, true, false], [2, 4, null, false, true])).toEqual([
      1,
    ]);
  });
  it('should return a blank array if all values from input array are present in values', () => {
    expect(difference([1, 2], [2, 1])).toEqual([]);
  });
});

describe('Testing lodash/differenceBy', () => {
  it('should return an array', () => {
    expect(Array.isArray(differenceBy([1, 2], [2, 4]))).toBeTruthy();
  });
  it('should work like difference when iteratee is not provided', () => {
    expect(differenceBy([1, 2], [2, 4])).toEqual([1]);
    expect(
      differenceBy([1, 2, undefined, null, NaN], [2, 4, null, NaN])
    ).toEqual([1, undefined]);
    expect(
      differenceBy([1, 2, true, false], [2, 4, null, false, true])
    ).toEqual([1]);
  });
  it('should return an array of elements from input array not included in values by invoking iteratee on both of them', () => {
    expect(differenceBy([1.1, 2.4], [2.5, 4.2], Math.floor)).toEqual([1.1]);
    expect(differenceBy([1, 3, 5], [2, 4], isOdd)).toEqual([1, 3, 5]);
    expect(differenceBy([2, 4, 6], [22, 44], isEven)).toEqual([]);
  });
});

describe('Testing lodash/differenceWith', () => {
  it('should return an array', () => {
    expect(Array.isArray(differenceWith([1, 3, 4], [2, 3], gte))).toBeTruthy();
  });
  it('should behave as difference if the comparator function is not passed in', () => {
    expect(differenceWith([1, 2, 3], [2, 3])).toEqual([1]);
  });
  it('should return an array with elements from input array which are not included in the values array. The comparison should happen with the comparator function', () => {
    expect(differenceWith([1, 2, 3], [6, 9], gte)).toEqual([1, 2, 3]);
    expect(differenceWith([1, 2, 3], [0, 2], gte)).toEqual([]);
  });
});

describe('Testing lodash/drop', () => {
  it('should return an array', () => {
    expect(Array.isArray(drop([1, 3, 4], 1))).toBeTruthy();
  });
  it('should return a blank array if n is greater than or equal to the number of elements of the input array', () => {
    expect(drop([1, 3], 4)).toEqual([]);
    expect(drop([1, 2, 3, 4], 4)).toEqual([]);
  });
  it('should return the input array as is if n is 0', () => {
    expect(drop([1, 2, 4], 0)).toEqual([1, 2, 4]);
  });
  it('should default to 1 if n is not provided', () => {
    expect(drop([1, 3])).toEqual([3]);
  });
  it('should return a slice of an array with n elements dropped from the beginning', () => {
    expect(drop([1, 2, 3, 4], 2)).toEqual([3, 4]);
  });
});

describe('Testing lodash/dropRight', () => {
  it('should return an array', () => {
    expect(Array.isArray(dropRight([1, 3, 4], 1))).toBeTruthy();
  });
  it('should return a blank array if n is greater than or equal to the number of elements of the input array', () => {
    expect(dropRight([1, 3], 4)).toEqual([]);
    expect(dropRight([1, 2, 3, 4], 4)).toEqual([]);
  });
  it('should return the input array as is if n is 0', () => {
    expect(dropRight([1, 2, 4], 0)).toEqual([1, 2, 4]);
  });
  it('should default to 1 if n is not provided', () => {
    expect(dropRight([1, 3])).toEqual([1]);
  });
  it('should return a slice of an array with n elements dropped from the end', () => {
    expect(dropRight([1, 2, 3, 4], 2)).toEqual([1, 2]);
  });
});

describe('Testing lodash/dropWhile', () => {
  it('should return an array', () => {
    expect(Array.isArray(dropWhile([1, 2, 3], (x) => x))).toBeTruthy();
  });
  it('should return blank array when predicate is not provided', () => {
    expect(dropWhile([1, 3, 4])).toEqual([]);
  });
  it('should return elements of input array exluding the dropped elements. Elements are dropped from the beginning for which the predicate is falsey', () => {
    var users = [
      { user: 'barney', active: false },
      { user: 'fred', active: false },
      { user: 'pebbles', active: true },
    ];
    expect(dropWhile([1, 3, 4], isEven)).toEqual([1, 3, 4]);
    expect(
      dropWhile(users, function (o) {
        return !o.active;
      })
    ).toEqual([{ user: 'pebbles', active: true }]);
  });
});

describe('Testing lodash/dropWhileRight', () => {
  it('should return an array', () => {
    expect(Array.isArray(dropRightWhile([1, 2, 3], (x) => x))).toBeTruthy();
  });
  it('should return a blank array when no predicte is provided.', () => {
    expect(dropWhile([1, 3, 4])).toEqual([]);
  });
  it('should return elements of input array exluding the dropped elements. Elements are dropped from the end for which the predicate is falsey', () => {
    var users = [
      { user: 'barney', active: true },
      { user: 'fred', active: true },
      { user: 'pebbles', active: false },
    ];
    expect(dropRightWhile([1, 3, 4], isEven)).toEqual([1, 3]);
    expect(
      dropRightWhile(users, function (o) {
        return !o.active;
      })
    ).toEqual([
      { user: 'barney', active: true },
      { user: 'fred', active: true },
    ]);
  });
});
