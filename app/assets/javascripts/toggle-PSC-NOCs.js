document.addEventListener('DOMContentLoaded', function () {
  // Show checkbox block
  const checkboxBlock = document.querySelector('.js-enabled-checkboxes');
  if (checkboxBlock) checkboxBlock.removeAttribute('hidden');

  // Hide all content sections initially (only if JS is on)
  const contentDivs = document.querySelectorAll('.noc-content');
  contentDivs.forEach(div => div.hidden = true);

  // Set up checkboxes
  const checkboxes = document.querySelectorAll('input[name="typeNOC"]');
  checkboxes.forEach(cb => {
    const targetDiv = document.getElementById(cb.value);

    cb.addEventListener('change', function () {
      if (targetDiv) {
        targetDiv.hidden = !cb.checked;
      }
    });

    // On page load, show if pre-checked (e.g. form resubmission)
    if (cb.checked && targetDiv) {
      targetDiv.hidden = false;
    }
  });
});
