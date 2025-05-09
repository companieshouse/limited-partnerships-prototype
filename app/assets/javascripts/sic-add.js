
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('button.govuk-button--secondary');
  const summaryList = document.querySelector('.govuk-summary-list');

  addButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Always grab the input at click time (ensures it exists)
    const autocompleteEnhancedInput = document.querySelector('.autocomplete__input');
    const value = autocompleteEnhancedInput?.value;
    if (!value) return;

    const match = value.match(/^(\d{5}),\s(.+)$/);
    if (!match) {
      alert("Please select a valid SIC code from the list.");
      return;
    }

    const [_, code, description] = match;

    // Check for duplicates
    const isDuplicate = Array.from(summaryList.querySelectorAll('.govuk-summary-list__key'))
      .some(el => el.textContent.trim() === code);
    if (isDuplicate) {
      alert("This SIC code is already in the list.");
      return;
    }

    // Create and append a new summary row
    const row = document.createElement('div');
    row.className = 'govuk-summary-list__row';
    row.innerHTML = `
      <dt class="govuk-summary-list__key">${code}</dt>
      <dd class="govuk-summary-list__value">${description}</dd>
      <dd class="govuk-summary-list__actions">
        <a class="govuk-link" href="#" data-code="${code}">
          Remove<span class="govuk-visually-hidden"> ${code} ${description}</span>
        </a>
      </dd>
    `;
    summaryList.appendChild(row);

    // Clear the enhanced autocomplete input
    autocompleteEnhancedInput.value = '';
  });

  // Event delegation for "Remove" links
  summaryList.addEventListener('click', function (e) {
    if (e.target.matches('.govuk-link')) {
      e.preventDefault();
      const row = e.target.closest('.govuk-summary-list__row');
      if (row) row.remove();
    }
  });
});

