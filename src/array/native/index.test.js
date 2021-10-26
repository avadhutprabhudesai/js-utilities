import { filter, find, map } from '.';

const square = (x) => x * x;
const isEven = (x) => x % 2 === 0;

const arr = [1, 2, 3, 4];

describe('Testing native/map', () => {
  const squared = map(arr, square);
  it('should return an array', () => {
    expect(Array.isArray(squared)).toBeTruthy();
  });
  it('should return an array of same size as an input array', () => {
    expect(squared.length).toEqual(arr.length);
  });
  it('should return a new array by applying transformation function to each element of the input array', () => {
    expect(squared).toEqual([1, 4, 9, 16]);
  });
});

describe('Testing native/filter', () => {
  const evens = filter(arr, isEven);
  it('should return an array', () => {
    expect(Array.isArray(evens)).toBeTruthy();
  });
  it('should return an array with the elements from input array which return truthy for the predicate', () => {
    expect(evens).toEqual([2, 4]);
  });
  it('should return an empty array if none of the elements from input array satisfy the predicate', () => {
    expect(filter([1, 1, 1], isEven)).toEqual([]);
  });
});

describe('Testing native/find', () => {
  it('should return the first element for which predicate returns truthy', () => {
    expect(find(arr, isEven)).toEqual(2);
  });
  it('should return undefined if none of the elements return truthy', () => {
    expect(find([1, 1], isEven)).toBeUndefined();
  });
});
