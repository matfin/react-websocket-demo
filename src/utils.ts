export const formattedCurrency = (
  amount: number,
  currency = 'EUR',
  locale = 'lookup'
): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
