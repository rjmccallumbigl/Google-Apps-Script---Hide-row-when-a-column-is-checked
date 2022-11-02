/****************************************************************************************************************************************
*
* Hide row when a box in ColD is checked.
*
* @param e {Object} The current cell being edited
*
* Instructions
* 1. Paste the code in the Google Apps Script editor.
* 2. Edit Trigger for the code.
* 3. Add trigger for atEdit() function.
* 4. Select event source: from spreadsheet
* 5. Select event type: on edit.
*
****************************************************************************************************************************************/

function atEdit(e) {

  // Define debug variable to display 'e' per https://stackoverflow.com/a/46859894/7954017
  var debug_e = {
    authMode: e.authMode.toString(),
    range: e.range.getA1Notation(),
    source: e.source.getId(),
    user: e.user,
    value: e.value,
    oldValue: e.oldValue
  }
  console.log({ message: 'onEdit() Event Object', eventObject: debug_e });

  //  Declare variables
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var sheetRange = sheet.getDataRange();
  var sheetRangeValues = sheetRange.getDisplayValues();
  var headerRow = sheetRangeValues[0];
  // var checkHeader = headerRow.indexOf("✖");  

  // Edited cell gets passed into function
  var range = e.range;

  //  Returns the number of the edited row and column
  var thisRow = range.getRow();
  var thisCol = range.getColumn();
  var queryRange = sheet.getRange(thisRow, thisCol);
  var queryRangeValue = queryRange.getDisplayValue();

  //  If cell is checked under ColD, hide row of checked cell
  if (thisCol == 4 && thisRow > 1 && queryRange.isChecked()) {

    sheet.hideRow(queryRange);
    queryRange.uncheck();

    //  Set data to spreadsheet
    SpreadsheetApp.flush();

    // if (showSheet.getActiveRange().isChecked()) {    


  }
}
