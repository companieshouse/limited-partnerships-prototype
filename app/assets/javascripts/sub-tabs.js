function show_filing_type() {
  var filing_type_checkbox = document.getElementById('show-filing');
  var filing_type_cols = document.getElementsByName('type_cols');

  if (filing_type_checkbox.checked) {
    for (let i = 0; i < filing_type_cols.length; i++)
      filing_type_cols[i].classList.remove('govuk-visually-hidden');
  } else {
    for (let i = 0; i < filing_type_cols.length; i++)
      filing_type_cols[i].classList.add('govuk-visually-hidden');
  }
}

function search_tab_click(tab) {
  var all_tab = document.getElementById('all_tab');
  var companies_tab = document.getElementById('companies_tab');
  var search_officers_tab = document.getElementById('search_officers_tab');
  var disqualifications_tab = document.getElementById('disqualifications_tab');

  var all_link = document.getElementById('all_link');
  var companies_link = document.getElementById('companies_link');
  var search_officers_link = document.getElementById('search_officers_link');
  var disqualifications_link = document.getElementById('disqualifications_link');

  if (tab == 'all') {
      all_tab.classList.remove('govuk-visually-hidden');
      all_link.classList.add('active_tab');
    
      companies_tab.classList.add('govuk-visually-hidden');
      companies_link.classList.remove('active_tab');

      search_officers_tab.classList.add('govuk-visually-hidden');
      search_officers_link.classList.remove('active_tab');

      disqualifications_tab.classList.add('govuk-visually-hidden');
      disqualifications_link.classList.remove('active_tab');

  } else if (tab == 'companies') {
      all_tab.classList.add('govuk-visually-hidden');
      all_link.classList.remove('active_tab');
    
      companies_tab.classList.remove('govuk-visually-hidden');
      companies_link.classList.add('active_tab');

      search_officers_tab.classList.add('govuk-visually-hidden');
      search_officers_link.classList.remove('active_tab');

      disqualifications_tab.classList.add('govuk-visually-hidden');
      disqualifications_link.classList.remove('active_tab');

  } else if (tab == 'officers') {
      all_tab.classList.add('govuk-visually-hidden');
      all_link.classList.remove('active_tab');
    
      companies_tab.classList.add('govuk-visually-hidden');
      companies_link.classList.remove('active_tab');

      search_officers_tab.classList.remove('govuk-visually-hidden');
      search_officers_link.classList.add('active_tab');

      disqualifications_tab.classList.add('govuk-visually-hidden');
      disqualifications_link.classList.remove('active_tab');

  } else if (tab == 'disqualifications') {
      all_tab.classList.add('govuk-visually-hidden');
      all_link.classList.remove('active_tab');
    
      companies_tab.classList.add('govuk-visually-hidden');
      companies_link.classList.remove('active_tab');

      search_officers_tab.classList.add('govuk-visually-hidden');
      search_officers_link.classList.remove('active_tab');

      disqualifications_tab.classList.remove('govuk-visually-hidden');
      disqualifications_link.classList.add('active_tab');
  }
}


function people_tab_click(tab) {
  var officers_tab = document.getElementById('officers_tab');
  var psc_tab = document.getElementById('psc_tab');
  var officers_link = document.getElementById('officers_link');
  var psc_link = document.getElementById('psc_link');

  if (tab == 'officers') {
      officers_tab.classList.remove('govuk-visually-hidden');
      officers_link.classList.add('active_tab');
    
      psc_tab.classList.add('govuk-visually-hidden');
      psc_link.classList.remove('active_tab');
  } else if (tab == 'psc') {
      officers_tab.classList.add('govuk-visually-hidden');
      officers_link.classList.remove('active_tab');
    
      psc_tab.classList.remove('govuk-visually-hidden');
      psc_link.classList.add('active_tab');
  }
}


function filter_table() {
  var row_visible = false;
  var some_rows_visible = false;
  var checked_boxes_list = [];
  var checkboxes = document.getElementsByClassName("govuk-checkboxes__input");
  var history_table = document.getElementById("history_table");
  var no_results_paragraph = document.getElementById("no_results_paragraph");

  //loop around small checkboxes and if checked add name to list
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].name != 'show-filing') {
      if (checkboxes[i].checked) {
        checked_boxes_list.push(checkboxes[i].name);
      }
    }
  }

  //no checked boxes so all rows visible
  if (checked_boxes_list.length == 0 ) {
    row_visible = true;
    some_rows_visible = true;
  }

  //get all table rows
  var table_rows = document.getElementsByClassName("govuk-table__row");

  //loop through all rows
  for (let i = 0; i < table_rows.length; i++) {

    //loop around checked checkboxes list and see if row name matches any checked 
    for (let j = 0; j < checked_boxes_list.length; j++) {
      if (table_rows[i].getAttribute('name') == checked_boxes_list[j]) {
        row_visible = true;
        some_rows_visible = true;
        break;
      } else {
        row_visible = false;
      }
    }

    if (row_visible ) {
      table_rows[i].classList.remove('govuk-visually-hidden')
    } else {
      table_rows[i].classList.add('govuk-visually-hidden');
    }

    if (table_rows[i].getAttribute('name') == 'header'){
      table_rows[i].classList.remove('govuk-visually-hidden');
    }

  }

  //show 'no results' paragraph and hide table if no matching rows
  if (some_rows_visible) {
    history_table.classList.remove('govuk-visually-hidden')
    no_results_paragraph.classList.add('govuk-visually-hidden')
  } else {
    history_table.classList.add('govuk-visually-hidden');
    no_results_paragraph.classList.remove('govuk-visually-hidden')
  }
}