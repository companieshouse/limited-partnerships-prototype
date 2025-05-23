  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.govuk-js-hidden').forEach(function (el) {
      el.classList.remove('govuk-js-hidden');
    });

    const printButton = document.getElementById('print-button');
    if (printButton) {
      printButton.addEventListener('click', function (event) {
        event.preventDefault();
        window.print();
      });
    }
  });
