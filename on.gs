function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
      .createMenu('RichText')
      .addItem('RichTexttoHTML', 'testGetRichTexttoHTML')
      .addItem('TagOps', 'testTagOps')
      .addItem('JSONtoRichText', 'testJSONtoRichText')
      .addToUi();
}