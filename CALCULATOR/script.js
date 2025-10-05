let expr = "";
let result = "";
const expElement = document.getElementById('calc-exp');
const resElement = document.getElementById('calc-res');

function updateDisplay() {
  expElement.textContent = expr;
  resElement.textContent = result;
}

function calculate() {
  let tempExpr = expr.replace(/÷/g, '/').replace(/\*/g, '*').replace(/%/g, '/100');
  try {
    result = tempExpr ? eval(tempExpr) : "";
  } catch {
    result = "Error";
  }
  resElement.textContent = result;
}

document.querySelectorAll('.calc-keypad button').forEach(btn => {
  btn.onclick = function () {
    const val = btn.textContent;
    switch(val) {
      case "CLR":
        expr = "";
        result = "";
        break;
      case "DEL":
        expr = expr.slice(0, -1);
        break;
      case "ANS":
        expr += result;
        break;
      case "=":
        calculate();
        expr = "";
        break;
      case "±":
        if (expr && !isNaN(expr)) {
          expr = String(-parseFloat(expr));
        }
        break;
      case "√":
        if(expr) {
          try {
            expr = String(Math.sqrt(eval(expr)));
          } catch { expr = "Error"; }
        }
        break;
      default:
        expr += val;
    }
    if (val !== "=" && val !== "CLR") {
      calculate();
    }
    updateDisplay();
  };
});

updateDisplay();
