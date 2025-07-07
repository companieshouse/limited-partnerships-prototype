  document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('toggle-overdue');
    const notOverdueDiv = document.querySelector('.cs-not-overdue');
    const overdueDiv = document.querySelector('.cs-overdue');

    function toggleDivs() {
      if (checkbox.checked) {
        overdueDiv.style.display = '';
        notOverdueDiv.style.display = 'none';
      } else {
        overdueDiv.style.display = 'none';
        notOverdueDiv.style.display = '';
      }
    }

    checkbox.addEventListener('change', toggleDivs);

    // Initialize on page load
    toggleDivs();
  });