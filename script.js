function initialize()
{
  numberDice = null;
  numberRoll = null;
  inputContainer = document.getElementById("diceThing");

  let dices = Array.from(document.getElementsByClassName('dice'));

  dices.forEach(dice => {
        dice.addEventListener('click', () => {
          dices.forEach(dice =>dice.classList.remove('visible'));
          dice.classList.add('visible');
          setDice(dice);

        });
    });
}
function recordData(){
  if(document.getElementById("results").rows.length> 1){
    removeTable();
  }
  if(inputContainer.roll.value<0|| inputContainer.roll.value == ""||numberDice==null){
    document.getElementById("warning").innerHTML ="please choose a realistic number";
  }
  else{
    numberRoll = inputContainer.roll.value;
    console.log(numberDice + " " + numberRoll);
    setTable();
    document.getElementById("warning").innerHTML = "";
    document.getElementById("rollz").innerHTML = numberRoll;
    roll();
    mean();
    mode();
    median();
  
}
}

function median(){
  var a = (numberRoll/2.0);
  medianN = 0;
  var rowLength = document.getElementById("results").rows.length;
  for(let i = 1; i < rowLength; i++){
      var x = document.getElementById("results").rows[i].cells[1].innerText;
      var z = parseInt(x);
      a -= z;
      console.log(a);
      if(a < 0){
        medianN = parseInt(document.getElementById("results").rows[i].cells[0].innerText);
        break;
      }
      else if (a == 0){
        medianN = (isEmpty(i) + parseInt(document.getElementById("results").rows[i].cells[0].innerText))/2;
        break;
      }
  }
  document.getElementById("medianz").innerHTML = medianN;
}
function setDice(dice){
   var a = dice.id;
   numberDice = parseInt(a);
}

function isEmpty(a){
  var rowLength = document.getElementById("results").rows.length;
  for(let i = a +1; i < rowLength; i++){
     var x = document.getElementById("results").rows[i].cells[1].innerText;
     var z = parseInt(x);
     if(z>0){
       return parseInt(document.getElementById("results").rows[i].cells[0].innerText);
     }
  }
}

function mode(){
  var biggest = 0;
  var big = "0";
  var rowLength = document.getElementById("results").rows.length;
    for(let i = 1; i < rowLength; i++){
      var x = document.getElementById("results").rows[i].cells[1].innerText;
      var z = parseInt(x);
      if(biggest< parseInt(x)){
        biggest = parseInt(x);
        big = parseInt(document.getElementById("results").rows[i].cells[0].innerText);
      }
      else if(biggest== parseInt(x)){
        big +=", "+ parseInt(document.getElementById("results").rows[i].cells[0].innerText);
      }
    }
    document.getElementById("modez").innerHTML = big;
}

function mean(){
  var total = 0;
  var rowLength = document.getElementById("results").rows.length;
  for(let i = 1; i < rowLength; i++){
    var b = document.getElementById("results").rows[i].cells[1].innerText;
    total += (parseInt(b)*parseInt(document.getElementById("results").rows[i].cells[0].innerText));
  }
  total = (total/(numberRoll));
  total = total.toFixed(1);
  document.getElementById("meanz").innerHTML = total;
}

function removeTable(){
  var x = document.getElementById("results").rows.length;
  for(let i = x-1; i > 0; i--){
    document.getElementById("results").deleteRow(i);
  }
}
function roll(){
  for(let i = 0; i < numberRoll; i++){
    var a = dieRoll();
    console.log(a);
    var b = document.getElementById("results").rows[a-(numberDice -1)].cells[1].innerText;
    var c = parseInt(b) + 1;
    document.getElementById("results").rows[a-(numberDice -1)].cells[1].innerHTML = c;
  }
  
}

function setTable(){
  console.log("a");
    for(let i = numberDice; i < ((numberDice*6)+1); i++){
    var table = document.getElementById("results");
    var newrow = table.insertRow();
    var cell1 = newrow.insertCell(0);
    var cell2 = newrow.insertCell(1);
    cell1.innerHTML = i;
    cell2.innerHTML = 0;
    }
}

function dieRoll(){
  var sum = 0;
  for( var i = 0; i <numberDice; i++){
    sum += getRandomInteger(1,6);
  }
  return sum;
}
function getRandomInteger(lower,upper){
  var multiplier = upper - (lower-1);
  return parseInt(Math.random() * multiplier) + lower;
}