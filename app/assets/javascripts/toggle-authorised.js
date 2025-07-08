
  document.addEventListener('DOMContentLoaded', function () {
    const authorisedCheckbox = document.getElementById('toggle-authorised');

    if (authorisedCheckbox) {
      authorisedCheckbox.addEventListener('change', function () {
        const authorisedElements = document.querySelectorAll('.authorised');
        authorisedElements.forEach(function (el) {
          el.style.display = authorisedCheckbox.checked ? 'block' : 'none';
        });
      });

      // Optional: run once on page load to sync visibility
      authorisedCheckbox.dispatchEvent(new Event('change'));
    }
  });

