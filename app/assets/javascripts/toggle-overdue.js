document.addEventListener('DOMContentLoaded', function () {
  // Select the checkbox and list item for the tab update
  const overdueCheckbox = document.querySelector('input[name="overdue"]');
  const confirmationTab = document.querySelector('li a[href="#confirmation-statement"]').closest('li');
  const confirmationLink = confirmationTab.querySelector('a');

  // Select the confirmation statement key for the row update
  const confirmationStatementKey = document.querySelector('#confirmation-statement .govuk-summary-list__key');
  const confirmationStatementText = 'Confirmation statement';

  // Function to update the tab and confirmation statement based on the checkbox state
  function updateTabAndStatement() {
    // Update the tab text and style
    if (overdueCheckbox.checked) {
      confirmationTab.classList.add('ch-tab-overdue');  // Add the class to the tab
      confirmationLink.textContent = 'Confirmation statement overdue';  // Update text for the tab

      // Update the confirmation statement row
      confirmationStatementKey.innerHTML = `
        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-visually-hidden">Warning</span>
            Your confirmation statement is overdue
          </strong>
        </div>
      `;
    } else {
      confirmationTab.classList.remove('ch-tab-overdue');  // Remove the class from the tab
      confirmationLink.textContent = 'Confirmation statement';  // Reset tab text

      // Reset the confirmation statement row text
      confirmationStatementKey.textContent = confirmationStatementText;
    }
  }

  // Set up the event listener for the checkbox
  overdueCheckbox.addEventListener('change', updateTabAndStatement);

  // Initialize the state on page load
  updateTabAndStatement();
});
