var portName = '/dev/cu.usbmodem14311';
var options = { baudrate: 115200 };
var serial;
var inData;

let mgr;
let you;

let masks;

let buttonPressed;

let buttonW = 200;
let buttonH = 50;

let selections = {};
let incomeLabels = [
  "lower",
  "middle",
  "upper-middle",
  "upper",
];
let raceLabels = [
  "black",
  "hispanic",
  "other",
  "asian",
  "white",
];

let educationLabels = [
  "less-than-high-school",
  "high-school",
  "some-college",
  "bachelors",
  "advanced",
];

function preload(){
  roboto = loadFont('assets/fonts/RobotoMono.ttf');

  mapImage = loadImage('assets/images/map.png');
  browser = loadImage('assets/images/browser.png')
  welcome = loadImage('assets/images/welcome.png');
  button_search = loadImage('assets/images/button_search.png')
  blackf = loadImage('assets/images/black-f.png');
  whitef = loadImage('assets/images/white-f.png');
  hispf = loadImage('assets/images/hispanic-f.png');
  asianf = loadImage('assets/images/asian-f.png');

  blackm = loadImage('assets/images/black-m.png');
  whitem = loadImage('assets/images/white-m.png');
  hispm = loadImage('assets/images/hispanic-m.png');
  asianm = loadImage('assets/images/asian-m.png');

  you = blackf;

  masks = [
    loadImage('assets/images/mask1.png'),
    loadImage('assets/images/mask2.png'),
    loadImage('assets/images/mask3.png'),
    loadImage('assets/images/mask4.png'),
    loadImage('assets/images/mask5.png'),
    loadImage('assets/images/mask6.png'),
  ]
}

function setup() {
  mgr = new SceneManager();

  serial = new p5.SerialPort();
  // serial.on('list', console.log);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  serial.list();
  serial.open(portName, options);
  serial.clear();

  // createCanvas(1100, 800);
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  textAlign(CENTER);

  textFont(roboto);
  textSize(16);

  // Preload scenes. Preloading is normally optional
  // ... but needed if showNextScene() is used.
  mgr.addScene(ModelTrainer);
  mgr.addScene(Intro);
  mgr.addScene(Profile);
  mgr.addScene(Game);
  mgr.addScene(Prompt);
  mgr.addScene(Outro);

  mgr.showScene(ModelTrainer);
}

function showNextScene() {
  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}

function mousePressed() {
  mgr.mousePressed();
}

function keyPressed() {
  console.log(key, "is pressed");
  console.log(keyCode, "is pressed");

  switch(key) {
    //== Scenes
    case '0':
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
