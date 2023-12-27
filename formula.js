for (let i = 0; i < rows; i++) {
  for (j = 0; j < cols; j++) {
    let cell = document.querySelector(`.grid-cell-col[rID="${i}"][cID="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCellAndCellProp(address);
      let enteredValue = activeCell.innerText;
      cellProp.value = enteredValue;

      if (enteredValue === cellProp.value) return;

      cellProp.value = enteredValue;

      //If data modifies remove P-C relation, formula-empty, update children with new hardcoded (modified) value
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
    });
  }
}

let functionBar = document.querySelector(".function-bar");

functionBar.addEventListener("keydown", (e) => {
  let inputFunction = functionBar.value;
  if (e.key === "Enter" && inputFunction) {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndCellProp(address);
    if (inputFunction !== cellProp.formula)
      removeChildFromParent(cellProp.formula);

    let evaluatedResult = evaluateFormula(inputFunction);
    //To Update UI and Cell Prop in DB
    set_Cell_UI_and_Cell_Prop(evaluatedResult, inputFunction, address);
    addChildToParent(inputFunction);
    updateChildrenCells(address);
    // console.log(sheetDB)
  }
});

function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getActiveCellAndCellProp(
        encodedFormula[i]
      );
      encodedFormula[i] = parentCellProp.value;
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getActiveCellAndCellProp(
        encodedFormula[i]
      );
      encodedFormula[i] = parentCellProp.value;
      let idx = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
}

function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = getActiveCellAndCellProp(parentAddress);
  let children = parentCellProp.children;

  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getActiveCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedResult = evaluateFormula(childFormula);
    set_Cell_UI_and_Cell_Prop(evaluatedResult, childFormula, childAddress);
    updateChildrenCells(childAddress);
  }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getActiveCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
}

function set_Cell_UI_and_Cell_Prop(evaluatedResult, inputFunction, address) {
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  //UI update
  cell.innerText = evaluatedResult;

  //DB update
  cellProp.value = evaluatedResult;
  cellProp.formula = inputFunction;
}
