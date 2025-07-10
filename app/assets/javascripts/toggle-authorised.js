document.addEventListener('DOMContentLoaded', function () {
  const authorisedCheckbox = document.getElementById('toggle-authorised');
  const authorisedElements = document.querySelectorAll('.authorised');
  const hideWhenAuthorisedElements = document.querySelectorAll('.hide-when-authorised');
  const urlParams = new URLSearchParams(window.location.search);

  // Function to update visibility
  function updateAuthorisedVisibility(showAuthorised) {
    authorisedElements.forEach(el => {
      const displayStyle = el.classList.contains('display-as-block') ? 'block' : 'inline-block';
      el.style.display = showAuthorised ? displayStyle : 'none';
    });

    hideWhenAuthorisedElements.forEach(el => {
      const displayStyle = el.classList.contains('display-as-block') ? 'block' : 'inline-block';
      el.style.display = showAuthorised ? 'none' : displayStyle;
    });
  }

  // Determine initial state
  let initialAuthorised = urlParams.has("authorised");

  if (initialAuthorised) {
    updateAuthorisedVisibility(true);

    // Optionally sync checkbox state
    if (authorisedCheckbox) {
      authorisedCheckbox.checked = true;
    }
  }

  // Hook up checkbox toggle
  if (authorisedCheckbox) {
    authorisedCheckbox.addEventListener('change', function () {
      updateAuthorisedVisibility(authorisedCheckbox.checked);
    });

    // Sync on page load if no ?authorised param
    if (!initialAuthorised) {
      authorisedCheckbox.dispatchEvent(new Event('change'));
    }
  }
});
