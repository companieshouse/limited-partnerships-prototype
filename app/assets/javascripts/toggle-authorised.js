
  document.addEventListener('DOMContentLoaded', function () {
    const authorisedCheckbox = document.getElementById('toggle-authorised');
    const authorisedElements = document.querySelectorAll('.authorised');
    const urlParams = new URLSearchParams(window.location.search);

    // If the URL has ?authorised, show all authorised elements
    if (urlParams.has("authorised")) {
      authorisedElements.forEach(function (el) {
        el.style.display = 'inline-block'; // Change to 'block' or 'flex' if needed
      });

      // Optional: check the checkbox to match state
      if (authorisedCheckbox) {
        authorisedCheckbox.checked = true;
      }
    }

    // Set up checkbox toggle if it exists
    if (authorisedCheckbox) {
      authorisedCheckbox.addEventListener('change', function () {
        authorisedElements.forEach(function (el) {
          el.style.display = authorisedCheckbox.checked ? 'inline-block' : 'none';
        });
      });

      // Sync visibility on page load
      authorisedCheckbox.dispatchEvent(new Event('change'));
    }
  });

