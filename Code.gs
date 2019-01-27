function insertRichTextToActiveCell(){
  
  var range = SpreadsheetApp.getActiveRange();
  range.clearFormat()
  range.setFontSize(18);
  
  var textStyleBuilder = SpreadsheetApp.newTextStyle();
  textStyleBuilder.setForegroundColor('red');
  var textStyle = textStyleBuilder.build();
  Logger.log()
  var richTextBuilder = SpreadsheetApp.newRichTextValue();
  richTextBuilder.setText('Форматирование текста в ячейке. RichText');
  richTextBuilder.setTextStyle(textStyle)
  var value = richTextBuilder.build();
  
  range.setRichTextValue(value);
  
}

function rainbowActiveCell(){
  
  var cell = SpreadsheetApp.getActiveRange();
  var text = cell.getValue();
  var richTextBuilder = SpreadsheetApp.newRichTextValue();
  richTextBuilder.setText(text);
  for(var i = 0; i < text.length; i++){
    var textStyleBuilder = SpreadsheetApp.newTextStyle();
    textStyleBuilder.setForegroundColor(hslToHex(360 * i / text.length | 0, 100, 50));
    var textStyle = textStyleBuilder.build();
    richTextBuilder.setTextStyle(i, i + 1, textStyle);
  }
  var value = richTextBuilder.build();
  cell.setRichTextValue(value);
  
}


// Based on https://stackoverflow.com/a/44134328/1393023
var hslToHex = function (h, s, l) {
  var hue2rgb = function(p, q, t){
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  var toHex = function(x) {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  h /= 360, s /= 100, l /= 100;
  var r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return '#' + [r, g, b].map(toHex).join('');
}

function getTextStyleActiveCell(){
var cell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(8, 4);
var range = SpreadsheetApp.getActiveRange();
var TextStyle=cell.getTextStyle();
cell.getRichTextValues()
var richText = range.getRichTextValue();
  var runs = richText.getRuns();
  for (var i=0; i<runs.length; i++)
  {
    // get the style of this section of text, between startIndex and endIndex
    var run = runs[i];
  //  Logger.log(run)
    var startIndex = run.getStartIndex();
    var endIndex = run.getEndIndex();
    var styleBold = run.getTextStyle().isBold();
    Logger.log(startIndex & "-" & endIndex & ":" & styleBold)
  }


}




function style(tags){
try{
 var TextStyle = SpreadsheetApp.newTextStyle(); // Create a new text style
 
for (var tag in tags) {
Logger.log(tag)
if (isObject(tags[tag])){
 
 for (var key in tags[tag]) {
 
 if (key==='color'){TextStyle.setForegroundColor(tags[tag][key])}
 if (key==='size'){TextStyle.setFontSize(tags[tag][key])}
 if (key==='face'){TextStyle.setFontFamily(tags[tag][key])}
}
}
else {
if (tag==='u'){TextStyle.setUnderline(tags[tag])};
if (tag==='b'){TextStyle.setBold(tags[tag])};
//Logger.log(isBoolean(tags[tag]))
if (tag==='i'){TextStyle.setItalic(tags[tag])};
//if (tag='i'){TextStyle.setItalic(tags[tag])}
if (tag==='s'){TextStyle.setStrikethrough(tags[tag])};

}

 
 }
 return TextStyle
 }
catch(err){

Logger.log(err.name+"-"+err.message)
}
}
function testJSONtoRichText(){
var rng = SpreadsheetApp.getActiveSheet().getRange("A6");
rng.clearFormat()
var rngJSON = SpreadsheetApp.getActiveSheet().getRange("B6");
var js=JSON.parse(rngJSON.getValue())
Logger.log(rngJSON.getValue())
var l=0
var textJSON=''
var rich = SpreadsheetApp.newRichTextValue(); //new RichText
for (var key in js) {
textJSON+=js[key].text
var startOffset=js[key].startOffset
var endOffset=js[key].endOffset
var tags=js[key].format
Stylezer(rng,tags,startOffset,endOffset,rich)

}
var format = rich.build()
rng.setRichTextValue(format)
Logger.log(tags)

}


function testStyle(){
var rng = SpreadsheetApp.getActiveSheet().getRange("A6");
var tags={u:true,b:true,font:{size:20}}
var format=Stylezer(rng,tags,1,3)

rng.setRichTextValue(format)
}


function Stylezer(rng,tags,startOffset,endOffset,rich){

startOffset = startOffset || 0;

  var val = rng.getValue().toString();
  endOffset = endOffset || val.length;
 // var rich = SpreadsheetApp.newRichTextValue(); //new RichText
  rich.setText(val); //Set Text value in A1 to RichText
  var mstyle=style(tags)
  Logger.log("--------")
      var buildStyle = mstyle.build(); 
  
    rich.setTextStyle(startOffset,endOffset,buildStyle); // set this text style to the offset character range and save it to Rich text     
  //var format = rich.build()
  //rng.setRichTextValue(format); //Set the final RichTextValue back to A1
//  Logger.log(rich.getTextStyle())
return rich
}








function getRichTextToHTML(rng,optMinFontSize,optMaxFontSize,optFontFamily){
var optMinFontSize=optMinFontSize||11
var optMaxFontSize=optMinFontSize||33
var optFontFamily=optFontFamily||false
var v=rng.getRichTextValue().getRuns()
   Logger.log(JSON.stringify(v))
  var html=''
   var fullops={};
  var start=0
  var end=0
    for(var i = 0; i < v.length; i++){
    fullops[i]={}
    var ops={};
    var rText=v[i].getText()
    var rTextStyle=v[i].getTextStyle()
  end=start+rText.length
 if(rTextStyle.isBold()){ops.b = rTextStyle.isBold()};
 if(rTextStyle.isItalic()){ops.i = rTextStyle.isItalic()};
 if(rTextStyle.isUnderline()){ops.u = rTextStyle.isUnderline()};
 if(rTextStyle.isStrikethrough()){ops.s = rTextStyle.isStrikethrough()}
 ops.font={}
 ops.font.size=optMinFontSize+1
// if(rTextStyle.getFontSize()>=optMinFontSize&&rTextStyle.getFontSize()<=optMaxFontSize){

ops.font.size=rTextStyle.getFontSize()
//}
if(optFontFamily){ ops.font.face=rTextStyle.getFontFamily()};//html<5.0,'verdana';
ops.font.color=rTextStyle.getForegroundColor()

html+=TagOps(rText,ops)
fullops[i]={}
fullops[i]['format']=ops
fullops[i]['text']=rText
fullops[i]['startOffset']=start
fullops[i]['endOffset']=end
start=end
    }
    // 
var rngJSON = rng.offset(0,1)//(rowOffset, columnOffset)SpreadsheetApp.getActiveSheet().getRange("B6")  
var rngHTML = rng.offset(0,2)
var rngGetRunsCount = rng.offset(0,3)
rngJSON.setValue(JSON.stringify(fullops))
rngHTML.setValue(JSON.stringify(html))
rngGetRunsCount.setValue(v.length)
Logger.log(JSON.stringify(fullops))    
Logger.log(html)  


return html  
}
 function testTagOps(){
var range = SpreadsheetApp.getActiveRange();
//var rngJSON = rng.offset(0,1)//(rowOffset, columnOffset)SpreadsheetApp.getActiveSheet().getRange("B6")  
var rngHTML = range.offset(0,1)
var rngGetRunsCount = range.offset(0,-2)
 
 var textJson = range.getValue();
 var rngHTML = range.offset(0,1)
 rngHTML.setValue(TagOps(rngGetRunsCount.getValue(),JSON.parse(textJson)))
 
 }
 function TagOps(text,tags){
 var ret=''
 for (var tag in tags) {
 var atrs=''
 if (isObject(tags[tag])){
 
 for (var key in tags[tag]) {
 var atr=key+"="+tags[tag][key];
 atrs+=" "+atr
}

}

if (tag!='br'){
ret="<"+tag+atrs+">"+text+"</"+tag+">"
}
else{
ret=text+"<"+tag+">"
}

text=ret
}
 return ret
 
 
 }
 
 
function testGetRichTexttoHTML(){
var rng = SpreadsheetApp.getActiveSheet().getRange("A6");


 Logger.log(getRichTextToHTML(rng))
 }
 
function bolden(cell, charStartIndex, charEndIndex) {
  cell.setRichTextValue(SpreadsheetApp.newRichTextValue()
    .setText(cell.getValue())
    .setTextStyle(charStartIndex,charEndIndex, SpreadsheetApp
      .newTextStyle()
      .setBold(true)
      .build())
    .build());
}

function ggg(){
var cell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(5, 5);
bolden(cell,1,3)
}


function textFormatter() {
  // Get the current cell's text.
  var wb = SpreadsheetApp.getActive(), sheet = wb.getActiveSheet();
  var cell = sheet.getActiveCell(), value = cell.getValue();
  var len = value.toString().length;
  if(len == 0) return;

  // Change the color every 2 characters.
  var newCellData = Sheets.newCellData();
  newCellData.textFormatRuns = [];
  var step = 1 / len;
  for(var c = 0; c < len; c += 2) {
    var newFmt = Sheets.newTextFormatRun();
    newFmt.startIndex = c;
    newFmt.format = Sheets.newTextFormat();
    newFmt.format.foregroundColor = Sheets.newColor();
    newFmt.format.foregroundColor.green = (c + 2) * step;
    newCellData.textFormatRuns.push(newFmt);
  }

  // Create the request object.
  var batchUpdateRQ = Sheets.newBatchUpdateSpreadsheetRequest();
  batchUpdateRQ.requests = [];
  batchUpdateRQ.requests.push(
    {
       "updateCells": {
        "rows": [ { "values": newCellData } ],
        "fields": "textFormatRuns",
        "start": {
          "sheetId": sheet.getSheetId(),
          "rowIndex": cell.getRow() - 1,
          "columnIndex": cell.getColumn() - 1
        }
      }
    }
  );
  Sheets.Spreadsheets.batchUpdate(batchUpdateRQ, wb.getId());
}
