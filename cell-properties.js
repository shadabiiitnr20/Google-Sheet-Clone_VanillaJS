//Create the Storage
let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellStyleProps = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "12",
      fontColor: "#000000",
      BGColor: "#000000",
    };
    sheetRow.push(cellStyleProps);
  }
  sheetDB.push(sheetRow);
}

//Variable for active and inactiive prop color
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//Selectors for Cell Style Props
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family");
let fontSize = document.querySelector(".font-size");
let fontColor = document.querySelector(".color-input-font");
let BGColor = document.querySelector(".color-input-bg");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

//Attach Listeners
//Application of 2 way binding
//Bold Styling
bold.addEventListener("click", () => {
  let address = addressBar.value; //By using the address bar selector
  let [cell, cellProp] = getActiveCell(address);

  //Modification of Properties
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp;
});

//Attach Listeners
//Application of 2 way binding
//Italic Styling
italic.addEventListener("click", () => {
  let address = addressBar.value; //By using the address bar selector
  let [cell, cellProp] = getActiveCell(address);

  //Modification of Properties
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

//Attach Listeners
//Application of 2 way binding
//Underline Styling
underline.addEventListener("click", () => {
  let address = addressBar.value; //By using the address bar selector
  let [cell, cellProp] = getActiveCell(address);

  //Modification of Properties
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

//Attach Listeners
//Application of 2 way binding
//Font Size Styling

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value; //By using the address bar selector
  let [cell, cellProp] = getActiveCell(address);

  //Modification of Properties
  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

//Attach Listeners
//Application of 2 way binding
//Font Family Styling

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value; //By using the address bar selector
  let [cell, cellProp] = getActiveCell(address);

  //Modification of Properties
  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

//Attach Listeners
//Application of 2 way binding
//Font Color Styling

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value; //By using the address bar selector
  let [cell, cellProp] = getActiveCell(address);

  //Modification of Properties
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

//Attach Listeners
//Application of 2 way binding
//BG Color Styling

BGColor.addEventListener("change", (e) => {
  let address = addressBar.value; //By using the address bar selector
  let [cell, cellProp] = getActiveCell(address);

  //Modification of Properties
  cellProp.BGColor = BGColor.value;
  cell.style.backgroundColor = cellProp.BGColor;
  BGColor.value = cellProp.BGColor;
});

//Attach Listeners
//Application of 2 way binding
//Alignment Styling

alignment.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let address = addressBar.value; //By using the address bar selector
    let [cell, cellProp] = getActiveCell(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue; //DB Change
    cell.style.textAlign = cellProp.alignment;

    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll(".grid-cell-col");
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let { rid: row_ID, cid: col_ID } = e.target.dataset;
    let cellProp = sheetDB[row_ID][col_ID];

    //Apply Cell Properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.BGColor === "#000000" ? "transparent" : cellProp.BGColor;
    cell.style.textAlign = cellProp.alignment;

    //Apply Styling to UI Icons
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    BGColor.value = cellProp.BGColor;

    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
}

function getActiveCell(address) {
  let [row_ID, col_ID] = decode_rowID_colID_from_address(address);
  //Access Cell and Storage Object
  let cell = document.querySelector(
    `.grid-cell-col[rID="${row_ID}"][cID="${col_ID}"]`
  );
  let cellProp = sheetDB[row_ID][col_ID];
  return [cell, cellProp];
}

function decode_rowID_colID_from_address(address) {
  let row_ID = Number(address.slice(1) - 1);
  let col_ID = Number(address.charCodeAt(0)) - 65;
  return [row_ID, col_ID];
}
