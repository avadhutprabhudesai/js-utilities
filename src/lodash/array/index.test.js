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
  fill,
  find,
  findIndex,
  findLastIndex,
  flatten,
  flattenDeep,
  flattenDepth,
  fromPairs,
  initial,
  intersection,
  intersectionBy,
  intersectionWith,
  join,
  last,
  nth,
  pull,
  pullAll,
  pullAllBy,
  pullAllWith,
  pullAt,
  remove,
} from '.';
import { negate } from '../function';

const isEven = (x) => x % 2 === 0;
const isOdd = negate(isEven);
const gte = (l, r) => l >= r;
const isObject = (val) => typeof val === 'object' && val !== null;

describe('Testing lodash/chunk', () => {
  it('should return an array', () => {
    expect(Array.isArray(chunk([1, 2, 3, 4], 1))).toBeTruthy();
  });
  it('should return an empty array when size is 0 ', () => {
    expect(chunk([1, 2, 3, 4], 0)).toEqual([]);
  });
  it('  should return an array containing chunk-sized arrays', () => {
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

describe('Testing lodash/fill', () => {
  it('should mutate the original array', () => {
    const arr = [1, 2, 3, 4];
    fill(arr, 'a');
    expect(arr).toEqual(['a', 'a', 'a', 'a']);
  });
  it('should fill original array with given value from start to end, but not including end', () => {
    const arr = [1, 2, 3, 4];
    fill(arr, 'a', 1, 3);
    expect(arr).toEqual([1, 'a', 'a', 4]);
  });
  it('should assume start as 0, if not given', () => {
    const arr = [1, 2, 3, 4];
    fill(arr, 'a');
    expect(arr).toEqual(['a', 'a', 'a', 'a']);
  });
  it('should assume end as array.length, if not given', () => {
    const arr = [1, 2, 3, 4];
    fill(arr, 'a', 1);
    expect(arr).toEqual([1, 'a', 'a', 'a']);
  });
});

// @TODO: add test cases for object
describe('Testing lodash/find', () => {
  const arr = [1, 2, 3, 4];
  it('should return first element from an array for which the predicate is truthy', () => {
    expect(find(arr, isEven)).toEqual(2);
  });
  it('should return first element from an array from given index for which the predicate is truthy', () => {
    expect(find(arr, isEven, 2)).toEqual(4);
  });
  it('should return undefined if none of the element return truthy for given predicate', () => {
    expect(find([1, 1, 1, 1], isEven)).toBeUndefined();
  });
  it('should return the element at 0th index if predicate function is not provided', () => {
    expect(find(arr)).toEqual(1);
  });
});

// @TODO: add test cases for object
describe('Testing lodash/findIndex', () => {
  const arr = [1, 2, 3, 4];
  it('should return index of first element from an array for which the predicate is truthy', () => {
    expect(findIndex(arr, isEven)).toEqual(1);
  });
  it('should return index of first element from an array from given index for which the predicate is truthy', () => {
    expect(findIndex(arr, isEven, 2)).toEqual(3);
  });
  it('should return -1 if none of the element return truthy for given predicate', () => {
    expect(findIndex([1, 1, 1, 1], isEven)).toEqual(-1);
  });
  it('should return 0 if predicate function is not provided', () => {
    expect(findIndex(arr)).toEqual(0);
  });
});

// @TODO: add test cases for object
describe('Testing lodash/findLastIndex', () => {
  const arr = [1, 2, 3, 4];
  it('should return index of last element from an array for which the predicate is truthy', () => {
    expect(findLastIndex(arr, isEven)).toEqual(3);
  });
  it('should return index of last element from an array from given index for which the predicate is truthy', () => {
    expect(findLastIndex(arr, isEven, 2)).toEqual(1);
  });
  it('should return -1 if none of the element return truthy for given predicate', () => {
    expect(findLastIndex([1, 1, 1, 1], isEven)).toEqual(-1);
  });
  it('should return array.length-1 if predicate function is not provided', () => {
    expect(findLastIndex(arr)).toEqual(arr.length - 1);
  });
});

describe('Testing lodash/flatten', () => {
  it('should return an array', () => {
    expect(Array.isArray(flatten([1, 2]))).toBeTruthy();
  });
  it('should return a blank array when blank array is passed', () => {
    expect(flatten([])).toEqual([]);
  });
  it('should return a blank array when no input is passed', () => {
    expect(flatten()).toEqual([]);
  });
  it('should return flatten input array 1 level deep', () => {
    expect(flatten([1, 2, [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
    expect(flatten([[1, 2, [3]]])).toEqual([1, 2, [3]]);
  });
});

describe('Testing lodash/flattenDeep', () => {
  it('should return an array', () => {
    expect(Array.isArray(flattenDeep([1, 2]))).toBeTruthy();
  });
  it('should return a blank array when blank array is passed', () => {
    expect(flattenDeep([])).toEqual([]);
  });
  it('should return a blank array when no input is passed', () => {
    expect(flattenDeep()).toEqual([]);
  });
  it('should recursively flatten the input array', () => {
    expect(flattenDeep([[0, [1, 2, [[3, 4]], 5]]])).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe('Testing lodash/flattenDepth', () => {
  it('should return an array', () => {
    expect(Array.isArray(flattenDepth([1, 2], 1))).toBeTruthy();
  });
  it('should return a blank array if blank array is passed', () => {
    expect(flattenDepth([], 1)).toEqual([]);
  });
  it('should return a blank array if no input is passed', () => {
    expect(flattenDepth()).toEqual([]);
  });
  it('should return the array as is if depth is set to 0', () => {
    expect(flattenDepth([[[1, 2, 3]]], 0)).toEqual([[[1, 2, 3]]]);
  });
  it('should flatten the input array n level deep', () => {
    expect(flattenDepth([[[1, 2, 3]]], 2)).toEqual([1, 2, 3]);
    expect(flattenDepth([1, 2, [[3]]], 2)).toEqual([1, 2, 3]);
    expect(flattenDepth([[1], [[[2]]], [[3]]], 2)).toEqual([1, [2], 3]);
  });
});

describe('Testing lodash/fromPairs', () => {
  it('should return an object', () => {
    expect(isObject(fromPairs([['a', 1]]))).toBeTruthy();
  });
  it('should return a blank object if no pairs are provided', () => {
    expect(fromPairs()).toEqual({});
  });
  it('should return a blank object if blank pairs are provided', () => {
    expect(fromPairs([[], []])).toEqual({});
  });
  it('should return an object with values as undefined when value in the pair is missing', () => {
    expect(fromPairs([['a'], ['b']])).toEqual({ a: undefined, b: undefined });
  });
  it('should return an object with keys and values from given key-value pair arrays', () => {
    expect(
      fromPairs([
        ['a', 1],
        ['b', 2],
      ])
    ).toEqual({ a: 1, b: 2 });
  });
});

describe('Testing lodash/initial', () => {
  it('should return an array', () => {
    expect(Array.isArray(initial([1, 2, 3]))).toBeTruthy();
  });
  it('should return blank array if input array is blank or no input is provided or input array contains only 1 element', () => {
    expect(initial([])).toEqual([]);
    expect(initial()).toEqual([]);
    expect(initial([1])).toEqual([]);
  });
  it('should return all but last element from an input array', () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
  });
});

describe('Testing lodash/intersection', () => {
  it('should return an array', () => {
    expect(Array.isArray(intersection([1, 2], [1, 2]))).toBeTruthy();
  });
  it('should return a blank array if first array is blank', () => {
    expect(intersection([], [1, 2])).toEqual([]);
  });
  it('should return an array containing unique values which are present in all given arrays', () => {
    expect(intersection([1, 2], [1, 2])).toEqual([1, 2]);
    expect(intersection([1, 2], [1, 2], [1, 5, 2])).toEqual([1, 2]);
    expect(intersection([1, 2], [1, 3], [2, 5])).toEqual([]);
  });
});

describe('Testing lodash/intersectionBy', () => {
  it('should return an array', () => {
    expect(
      Array.isArray(intersectionBy([1, 2], [1, 2], Math.floor))
    ).toBeTruthy();
  });
  it('should return a blank array if first array is blank', () => {
    expect(intersectionBy([], [1, 2], Math.floor)).toEqual([]);
  });
  it('should return an array containing unique values which are present in all given arrays', () => {
    expect(intersectionBy([1, 2], [1, 2], Math.floor)).toEqual([1, 2]);
    expect(intersectionBy([1, 2], [1, 2], [1, 5, 2], Math.floor)).toEqual([
      1, 2,
    ]);
    expect(intersectionBy([1, 2], [1, 3], [2, 5], Math.floor)).toEqual([]);
  });
});

describe('Testing lodash/intersectionWith', () => {
  it('should return an array', () => {
    expect(Array.isArray(intersectionWith([1, 2], [1, 2], gte))).toBeTruthy();
  });
  it('should return a blank array if first array is blank', () => {
    expect(intersectionWith([], [1, 2], gte)).toEqual([]);
  });
  it('should return an array containing unique values which are present in all given arrays', () => {
    expect(intersectionWith([1, 2], [1, 2], gte)).toEqual([1, 2]);
    expect(intersectionWith([6, 8], [1, 2], gte)).toEqual([6, 8]);
    expect(intersectionWith([1, 2], [1, 2], [10, 5, 2], gte)).toEqual([2]);
    expect(intersectionWith([1, 2], [1, 3], [2, 5], gte)).toEqual([2]);
  });
});

describe('Testing lodash/pull', () => {
  var arr;
  beforeEach(() => {
    arr = [1, 2, 3, 4];
  });
  it('should mutate the input array', () => {
    pull(arr, 1, 2);
    expect(arr).toEqual([3, 4]);
  });
  it('should return the input array as is when values are not provided', () => {
    pull(arr);
    expect(arr).toEqual([1, 2, 3, 4]);
  });
  it('should mutate the input array by removing all occurances of values provided', () => {
    pull(arr, 1, 2);
    expect(arr).toEqual([3, 4]);
    var strArr = ['a', 'b', 'c', 'd', 'a', 'c', 'd'];
    pull(strArr, 'a', 'b', 'd');
    expect(strArr).toEqual(['c', 'c']);
  });
});

describe('Testing lodash/pullAll', () => {
  var arr, strArr;
  beforeEach(() => {
    arr = [1, 2, 3, 4];
    strArr = ['a', 'b', 'c', 'c', 'b', 'd', 'd', 'e'];
  });
  it('should mutate input array', () => {
    pullAll(arr, [3, 4]);
    expect(arr).toEqual([1, 2]);
  });
  it('should remove all elements from input array which are present in the values array', () => {
    pullAll(strArr, ['c', 'd']);
    expect(strArr).toEqual(['a', 'b', 'b', 'e']);
  });
  it('should keep the original array as is if values array is blank', () => {
    pullAll(arr, []);
    expect(arr).toEqual([1, 2, 3, 4]);
  });
});

describe('Testing lodash/pullAllBy', () => {
  var arr, strArr;
  beforeEach(() => {
    arr = [1.1, 2.5, 3.7, 4.2];
    strArr = ['a', 'b', 'c', 'c', 'b', 'd', 'd', 'e'];
  });
  it('should mutate input array', () => {
    pullAllBy(arr, [3.5, 4.1], Math.floor);
    expect(arr).toEqual([1.1, 2.5]);
  });
  it('should remove all elements from input array which are present in the values array after applying iteratee function on both values', () => {
    pullAllBy(strArr, ['C', 'D'], (x) => x.toLowerCase());
    expect(strArr).toEqual(['a', 'b', 'b', 'e']);
  });
  it('should keep the original array as is if values array is blank', () => {
    pullAllBy(arr, [], Math.floor);
    expect(arr).toEqual([1.1, 2.5, 3.7, 4.2]);
  });
});

describe('Testing lodash/pullAllWith', () => {
  var arr;
  beforeEach(() => {
    arr = [1, 2, 3, 4];
  });
  it('should mutate input array', () => {
    pullAllWith(arr, [1, 3], gte);
    expect(arr).toEqual([]);
  });
  it('should pass each value in input array and values array to comparator function and if it returns true then remove it from input array', () => {
    pullAllWith(arr, [2, 4], (x, y) => x % y === 0);
    expect(arr).toEqual([1, 3]);
  });
  it('should keep the original array as is if values array is blank', () => {
    pullAllWith(arr, [], Math.floor);
    expect(arr).toEqual([1, 2, 3, 4]);
  });
});

describe('Testing lodash/pullAt', () => {
  var arr;
  beforeEach(() => {
    arr = [1, 2, 3, 4];
  });
  it('should mutate input array', () => {
    pullAt(arr, [1, 3]);
    expect(arr).toEqual([1, 3]);
  });
  it('should return the array of removed elements', () => {
    expect(pullAt(arr, [1, 3, 5, 6])).toEqual([2, 4, undefined, undefined]);
  });
  it('should remove element from input array at given indexes', () => {
    pullAt(arr, [2, 4]);
    expect(arr).toEqual([1, 2, 4]);
  });
  it('should keep the original array as is if values array is blank', () => {
    pullAt(arr, [], Math.floor);
    expect(arr).toEqual([1, 2, 3, 4]);
  });
});

describe('Testing lodash/join', () => {
  var arr;
  beforeEach(() => {
    arr = [1, 2, 3, 4];
  });
  it('should return a string', () => {
    expect(typeof join(arr, '')).toEqual('string');
  });
  it('should return a blank string if array is empty', () => {
    expect(join([], '-')).toEqual('');
  });
  it('should use  "," as a default separator', () => {
    expect(join(arr)).toEqual('1,2,3,4');
  });
  it('should return a string of all array elements joined together by given separator', () => {
    expect(join(arr, '-')).toEqual('1-2-3-4');
    expect(join(arr, '')).toEqual('1234');
  });
});

describe('Testing lodash/last', () => {
  it('should return undefined if the array is empty', () => {
    expect(last([])).toBeUndefined();
    expect(last()).toBeUndefined();
  });
  it('should return the last element of an array', () => {
    expect(last([1, 2, 3, 4])).toEqual(4);
  });
  it('should return the last character of a string', () => {
    expect(last('abcd')).toEqual('d');
  });
});

describe('Testing lodash/nth', () => {
  var arr;
  beforeEach(() => {
    arr = [1, 2, 3, 4];
  });
  it('should return 0th element if n is not provided', () => {
    expect(nth(arr)).toEqual(1);
  });
  it('should return nth element from input array', () => {
    expect(nth(arr, 3)).toEqual(4);
  });
  it('should return nth element from end if n is negative', () => {
    expect(nth(arr, -2)).toEqual(2);
    expect(nth([1, 2, 3, 4, 5, 6, 7, 8], -3)).toEqual(5);
    expect(nth([1, 2, 3, 4, 5, 6, 7, 8], -1)).toEqual(7);
  });
  it('should return undefined if n is greater than size of the array ', () => {
    expect(nth(arr, 10)).toBeUndefined();
  });
});

describe('Testing lodash/remove', () => {
  var arr;
  beforeEach(() => {
    arr = [1, 2, 3, 4, 5, 6];
  });
  it('should return an array', () => {
    expect(Array.isArray(remove(arr, isEven))).toBeTruthy();
  });
  it('should mutate the original array', () => {
    remove(arr, isEven);
    expect(arr).toEqual([1, 3, 5]);
  });
  it('should return an array of removed elements', () => {
    expect(remove(arr, isEven)).toEqual([2, 4, 6]);
  });
  it('should remove all the elements from input array for which predicate returns true', () => {
    remove(arr, isEven);
    expect(arr).toEqual([1, 3, 5]);
  });
  it('should return blank array if predicate returns true for all elements of input array', () => {
    expect(remove([2, 4, 6], isOdd)).toEqual([]);
  });
});
