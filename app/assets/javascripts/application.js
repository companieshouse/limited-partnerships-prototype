//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})

//show and hide SIC codes 
$(document).ready(function () {
  window.GOVUKFrontend.initAll()
  // Code snippet for the nationality page
  $('#second-sic-link').click(function() {
    $('#second-sic').show();
    $('#second-sic-link').hide();
    return false;
  });
  $('#third-sic-link').click(function() {
    $('#third-sic').show();
    $('#third-sic-link').hide();
    return false;
  });       
})


