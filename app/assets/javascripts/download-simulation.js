document.addEventListener('DOMContentLoaded', function () {
  const downloadBtn = document.getElementById('download-snapshot-btn');
  const spinner = document.getElementById('spinner-container');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault(); // 🛑 Stop form submission

      spinner.style.display = 'block';

      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/public/html/LP123456-limited-partnership-report.html';
        link.download = 'LP123456-limited-partnership-report.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        spinner.style.display = 'none';
      }, 10000); // 10 seconds
    });
  }
});
