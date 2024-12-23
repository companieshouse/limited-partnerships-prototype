document.addEventListener('DOMContentLoaded', () => {
  // Add a `js-enabled` class to the `html` element
  document.documentElement.classList.add('js-enabled');

  const link = document.getElementById('second-nationality-link');
  const div = document.getElementById('second-nationality-div');

  link.addEventListener('click', (event) => {
    event.preventDefault();

    div.style.display = 'block';
    link.style.display = 'none';
  });
});
