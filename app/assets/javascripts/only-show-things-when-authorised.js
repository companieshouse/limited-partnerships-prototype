  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("authorised")) {
      // Show all elements with class 'authorised'
      document.querySelectorAll('.authorised').forEach(el => {
        el.style.display = 'block';
      });
        // Hide elements with class 'hide-when-authorised'
      document.querySelectorAll('.hide-when-authorised').forEach(el => {
        el.style.display = 'none';
      });
    } else {
      // Hide them if the query param isn't present
      document.querySelectorAll('.authorised').forEach(el => {
        el.style.display = 'none';
      });
    }
  });
