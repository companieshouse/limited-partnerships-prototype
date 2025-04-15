
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.govuk-summary-list__actions a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const row = link.closest('.govuk-summary-list__row');
        if (row) {
          row.remove();
        }
      });
    });
  });
