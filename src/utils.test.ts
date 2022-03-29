import { arraysAreEqual, formattedCurrency } from 'utils';

describe('utils tests', (): void => {
  it('checks to see if two arrays are equal', (): void => {
    expect(arraysAreEqual([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true);
    expect(arraysAreEqual([1, 2], [1])).toBe(false);
    
    expect(arraysAreEqual(['a', 'b'], ['a', 'b'])).toBe(true);
    expect(arraysAreEqual(['a'], ['a', 'x'])).toBe(false);

    expect(arraysAreEqual()).toBe(true);
  });

  it('returns the correctly formatted currency', (): void => {
    expect(formattedCurrency(1.00)).toEqual('€1.00');
  });
});
