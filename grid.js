/* Define the number of Rows and Cols in our worksheet */
let rows = 100;
let cols = 26;

let addressCol = document.querySelector(".address-col");
let addressRow = document.querySelector(".address-row");
let gridContainer = document.querySelector(".grid-container");
let addressBar = document.querySelector(".address-bar");
let individualCells =
  document.getElementsByClassName(
    "grid-cell-col"
  ); /* Getting each cell via column */
let individualRows =
  document.getElementsByClassName(
    "grid-cell-row"
  ); /* Getting each cell via row */

for (let i = 0; i < rows; i++) {
  /* Creating each row cell from 1-100 for Adress Col */
  let addressColCells = document.createElement("div");
  addressColCells.innerText = i + 1;
  addressCol.appendChild(addressColCells);
  addressColCells.setAttribute("class", "address-col-cells");
}

for (let i = 0; i < cols; i++) {
  /* Creating each column cell from A-Z for Address Row */
  let addressRowCells = document.createElement("div");
  addressRowCells.innerText = String.fromCharCode(65 + i);
  addressRow.appendChild(addressRowCells);
  addressRowCells.setAttribute("class", "address-row-cells");
}

for (let i = 0; i < rows; i++) {
  /* Creating each cell in the grid by looping twice */
  /* Looping over each row */
  let gridCellRow = document.createElement("div");
  gridCellRow.setAttribute("class", "grid-cell-row");
  for (let j = 0; j < cols; j++) {
    /* For each row adding 26 cells and then moving to next row */
    let gridCellCol = document.createElement("div");
    gridCellCol.setAttribute("class", "grid-cell-col");
    gridCellCol.setAttribute("contenteditable", "true");

    gridCellCol.setAttribute("data-rID", i);
    gridCellCol.setAttribute("data-cID", j);
    //Attributes for Cell and Storage Indentification
    gridCellCol.setAttribute("rID", i);
    gridCellCol.setAttribute("cID", j);

    /* Appending all the 26 cells into one row */
    gridCellRow.appendChild(gridCellCol);
  }
  gridContainer.appendChild(gridCellRow);
}

for (let i = 0; i <= 2599; i++) {
  /* Looping over each cell column wise and getting the column alphabet */
  individualCells[i].addEventListener("click", () => {
    let colID = String.fromCharCode(65 + (i % 26));
    addressBar.value = colID;
  });
}

for (let i = 0; i < 100; i++) {
  /* Looping over each cell row wise and getting the row number */
  individualRows[i].addEventListener("click", () => {
    let rowID = i + 1;
    addressBar.value += rowID;
  });
}

//By Default Click on 1st Cell
let firstCell = document.querySelector(".grid-cell-col");
firstCell.click();
