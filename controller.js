
var StrokaArray = [];
var bilOper = false;
elem = document.getElementById("elem");
elem.focus();




function C() {
  elem.value = "";
  StrokaArray = [];
  bilOper = false;
}

function butNomer(nomer) {
  if (bilOper == true){
    elem.value = nomer;
  }else if (elem.value[0] == 0 && elem.value[1] !== ","){
    elem.value = nomer;
  }else {
    elem.value = elem.value + nomer;
  }
  bilOper = false;
}


function butRazdelitel(Razdelitel) {
  if (elem.value.indexOf(",") !== -1) {
    return;
  } else if (elem.value == "") {
    elem.value = "0" + Razdelitel;
    return;
  }
  elem.value=elem.value + Razdelitel; 
}



function SmenaZnaka(gg) {
  if (elem.value[0] == "0"||elem.value[0] == "-" && elem.value[1] == "0" || elem.value == ""){
    return;
  }
  
  if (elem.value[0] == "-") {
    elem.value = elem.value.substring(1);
  } else {
    elem.value = "-" + elem.value;
    StrokaArray.shift();
    StrokaArray.unshift(parseFloat(elem.value.replace(/[,]/, '.')));
  }   

}


function Operator(oper) {
  if (bilOper == true) {
    StrokaArray.pop();
    StrokaArray.push(oper);
  } else {
    if (elem.value == NaN || elem.value == "") {
      elem.value = 0;
    } 
    StrokaArray.push(parseFloat(elem.value.replace(/[,]/, '.')));
    StrokaArray.push(oper);
  }
    // Stroka=StrokaArray.join('');
    // console.log(Stroka);
    bilOper=true;

    if (StrokaArray.length >= 3) {
      elem.value=pos4itat(StrokaArray[1]);
    }

    if (oper == "%") {
      elem.value = StrokaArray[0] = elem.value / 100;
    }

  }



  function pos4itat(op) {
    let F="";
    switch (op) {
      case "+":
      F=StrokaArray[0] + StrokaArray[2];  
      break;
      case "-":
      F=StrokaArray[0] - StrokaArray[2];      
      break;
      case "*":
      F=StrokaArray[0] * StrokaArray[2];      
      break;
      case "/":
      F=StrokaArray[0] / StrokaArray[2];      
      break;  
    }
    F =+ F.toFixed(10);
    StrokaArray.shift();
    StrokaArray.shift();
    StrokaArray.shift();
    StrokaArray.unshift(F);
    elem.focus();
    return F;
  }



  function Klava(key) {

    if (bilOper==true){
      elem.value=key.slice(String(StrokaArray[0]).length);
    }

    key=key.replace(/,/g, '.');

    count = 0;
    pos = key.indexOf(".");
    while ( pos != -1 ) {
      count++;
      if (count>1) {
        key=elem.value= key.slice(0, -1);
      }
      pos = key.indexOf(".",pos+1);
    }

    var char=key.substr(key.length-1,1);
    if (isNumeric(key)){
      bilOper=false;

    }else if (char=="+"||char=="-"||char=="/"||char=="*"||char=="=") {
      key=elem.value= key.slice(0, -1);
      Operator(char);
    }else{
      alert("ЧИСЛО ВВЕДИ");
      C();
    }

  }


  function runScript(event){
    if(event.keyCode == 13){
      Klava(elem.value+"=");
    }
  }




  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }



