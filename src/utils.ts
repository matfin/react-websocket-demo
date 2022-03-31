export const formattedCurrency = (
  amount: number,
  currency = 'EUR',
  locale = 'lookup'
): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);

export const arraysAreEqual = <T>(a: T[] = [], b: T[] = []): boolean =>
  a.length === b.length && a.every((item: T, index: number): boolean => item === b[index]);
