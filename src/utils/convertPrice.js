export function formatCurrency(value) {
  if (value) {
    let parts = value.toString().split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let formattedValue = integerPart + decimalPart;

    return formattedValue;
  }
}
