document.addEventListener('DOMContentLoaded', () => {
  const currencySelector = document.getElementById('otherCurrencySelectorAlt2');
  const prefixElement = document.querySelector('.dynamic-prefix');

  currencySelector.addEventListener('change', () => {
    const selectedCurrency = currencySelector.value;
    prefixElement.textContent = selectedCurrency || ' '; // Default to ' ' if no value is selected
  });
});