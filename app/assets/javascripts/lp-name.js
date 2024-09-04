document.addEventListener('DOMContentLoaded', function() {
  const suffixDiv = document.querySelector('.govuk-input__suffix');
  const radioButtons = document.querySelectorAll('input[name="nameEnding"]');

  radioButtons.forEach(function(radioButton) {
      radioButton.addEventListener('change', function() {
          if (radioButton.checked) {
              suffixDiv.textContent = radioButton.value;
          }
      });
  });
});