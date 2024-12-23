  // Get the file input element
  const fileInput = document.getElementById('file-upload-1');

  // Add an event listener for the 'change' event
  fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
      // Navigate to the next page
      window.location.href = 'upload-confirm-document';
    }
  });