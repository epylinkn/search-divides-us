var portName = '/dev/cu.usbmodem1421';
      mgr.showScene( Debug );
      break;
    case '1':
      mgr.showScene( Intro );
      break;
    case '2':
      mgr.showScene( Profile );
      break;
    case '3':
      mgr.showScene( Game );
      break;
    case '4':
      mgr.showScene( Prompt );
      break;
    case '5':
      mgr.showScene( Outro );
      break;

    case '9':
      mgr.showscene( ModelTrainer );
      break;

    case ' ':
      mgr.showNextScene();
      break;

    // case 'I':
    //   pressedReset();
    //   break;
    // case 'O':
    //   pressedSearch();
    //   break;
    // case 'P':
    //   pressedRandom();
    //   break;
  }

  // dispatch via the SceneManager.
  mgr.keyPressed();
}

function pressedReset() {
  Debug.debounceTitle("RESET PRESSED");
}

function pressedSearch() {
  Debug.debounceTitle("SEARCH PRESSED");
}

function pressedRandom() {
  Debug.debounceTitle("RANDOM PRESSED");
}

function button(x,y, buttonText){
  push();
  fill(225,0,225);
  rect(x,y,buttonW,buttonH);
  fill(255);
  text(buttonText, x,y+5);
  pop();
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  let inString = serial.readLine();

  if (inString.length <= 0) return;

  // expect: <input-type>, <value>
  console.log("inData: ", inData);
  inData = inString.split(",");
  if (inData.length != 2) return;

  let input_label = inData[0];
  let input_value = inData[1];

  // IT'S A BUTTON!
  if (input_label == "button") {
    switch(input_value) {
      case "reset":
        pressedReset();
        break;
      case "search":
        pressedSearch();
        break;
      case "random":
        pressedRandom();
        break;
    }
    return;
  }

  //=== rotary values
  if (input_label == "income") {
    selections.income = incomeLabels.indexOf(input_value);
  }

  if (input_label == "race") {
    selections.race = raceLabels.indexOf(input_value);
  }

  if (input_label == "education") {
    selections.education = educationLabels.indexOf(input_value);
  }
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function squish(str) {
  return str.replace(/ +(?= )/g,'');
}

function placeholder(str) {
  return (str === undefined) ? "---" : str;
}

//KATHY TRYING TO MAKE THINGS WORK WITH THE IMAGE ....
// function getRace(){
//     if(selections.race == undefined){
//       you = blackf;
//     }
//     if (selections.race == "black"){
//       you = blackf;
//     }
//     if (selections.race == "hispanic"){
//       you = hispf;
//     }
//     if (selections.race == "asian"){
//       you = asianf;
//     }
//     if (selections.race == "white"){
//       you = whitef;
//     }
//
//     console.log(selections.race);
//   }
