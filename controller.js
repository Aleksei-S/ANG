elem = document.getElementById("elem");
elem.focus();
var operatorCONST ="";
var result = makeResult ();    //объект 


function makeResult () {

  let firstNumber = 0;
  let secondNumber = 0;
  let count = 0;         //счетчик 

  return {
    newNumber :  false,
    operator : "",       //оператор временный

    setNumber : function(value) {  //устанавливает первое или второе чисо
      count++;
      if (count == 1) {
        firstNumber = parseFloat(value);
      } else {
        secondNumber = parseFloat(value);
      }
    },
    calculate : function() {       //считает
      firstNumber = totalCalculate(firstNumber,operatorCONST,secondNumber);
      return firstNumber;
    },
    refresh : function() {         //сброс
      firstNumber = 0;
      secondNumber = 0;
      count = 0;
    }
  };
}

function totalCalculate (firstNumber, operatorCONST, secondNumber){

  if (operatorCONST == "+") {
    firstNumber = firstNumber + secondNumber;
  } 
  if (operatorCONST == "-") {
   firstNumber = firstNumber - secondNumber;
  } 
  if (operatorCONST == "/") {
  firstNumber = firstNumber / secondNumber;
  } 
  if (operatorCONST == "*") {
  firstNumber = firstNumber * secondNumber;
  } 
  if (operatorCONST=="%") {
  firstNumber = firstNumber * secondNumber / 100;
  }
  if (operatorCONST=="=") {
    result.refresh();
  }

  firstNumber=+firstNumber.toFixed(10);
  return firstNumber;
}

// клик оператор
function btnClickOperator (value) {

  result.operator = value;

  if (!result.newNumber) {
    result.setNumber(elem.value);
    elem.value = result.calculate();  //yyyb
    result.newNumber = true;
  }
}

// клик номер
function btnClickNumber (value) {

  if (!checkNumber(value)) return;
  operatorCONST = result.operator;
  if (!result.newNumber) {
    elem.value += value;
  } else {
    elem.value = value;
    result.newNumber = false;
  }
}

// проверка на число и точку
function checkNumber (value) {

  if (/[0-9]|\./.test(value)) {

    //проверка на точку
    if (value == ".") {
      if (elem.value == "" || result.newNumber == true) {
        elem.value = "0";
        result.newNumber = false;
        return true;
      }else if (elem.value.indexOf(".") == -1) {
        return true; 
      } else{
      return false;
      }
    }

    //проверка на ноль
    if (elem.value[0] == "0" && elem.value.length == 1) {
      elem.value = elem.value.slice(1, 0);
    return true;
    }
  return true;
  } else {
  return false;
  }
}

   // смена знака
function changeSign (value) {

  if (elem.value.substr(0,1) == "-") {
     elem.value=elem.value.substring(1);
  }else {
    elem.value="-"+elem.value;
  }

  result.refresh();
  result.setNumber(elem.value);
}

  // сброс
function refresh () {

  result.refresh();
  elem.value = "";
  operatorCONST ="";
}

//ввод с клавиатуры
function keyPressKeyboard(e) {

  let char = e.key;

  if (e.key == ",") {
    char = ".";
  }

  if(checkNumber(char)){
    btnClickNumber (char);
  } else if (char == "*" || char == "/" || char == "+" || char == "-") {
   btnClickOperator (char);
  } else if (char=="Enter" ) {
   btnClickOperator ("=");
  } 

 return false;
}
