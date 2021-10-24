describe('Testing lodash/chunk', () => {
  it('should return an empty array when size is 0 ', () => {
    expect(chunk([1, 2, 3, 4], 0)).toEqual([]);
  });
  it('should return an array containing chunk-sized arrays', () => {
    expect(chunk([1, 2], 1)).toEqual([[1], [2]]);
  });
  it('should have a last chunk with remaining elements if input array cannot be split evenly ', () => {
    expect(chunk([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]]);
  });
});
