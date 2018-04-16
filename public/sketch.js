var portName = '/dev/cu.usbmodem14621';
var options = { baudrate: 115200 };
var serial;
var inData;

let mgr;
let you;

let mask;

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
  "advanced"
];

function preload(){
  roboto = loadFont('assets/fonts/RobotoMono.ttf');

  mapImage = loadImage('assets/images/island_bam.png');

  blackf = loadImage('assets/images/bf.jpg');
  whitef = loadImage('assets/images/wf.jpg');
  hispf = loadImage('assets/images/hf.jpg');
  asianf = loadImage('assets/images/af2.jpg');

  blackm = loadImage('assets/images/bm.jpg');
  whitem = loadImage('assets/images/wm.jpg');
  hispm = loadImage('assets/images/hm.jpg');
  asianm = loadImage('assets/images/am.jpg');

  mask1a = loadImage('assets/images/mask1a.png');
  mask1b = loadImage('assets/images/mask1b.png');
  mask2a = loadImage('assets/images/mask2a.png');
  mask2b = loadImage('assets/images/mask2b.png');
  mask3a = loadImage('assets/images/mask3a.png');
  mask3b = loadImage('assets/images/mask3b.png');

  you = blackf;
  mask = mask2a;
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
  mgr.addScene ( Intro );
  mgr.addScene ( Profile );
  mgr.addScene ( Game );
  mgr.addScene ( Prompt );
  mgr.addScene ( Outro );

  // mgr.showNextScene();
  mgr.showScene( Intro );
}

function showNextScene() {
    mgr.showNextScene();
}

function draw()
{
    mgr.draw();
    // console.log(buttonPressed);
}

function mousePressed()
{
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

class Prompt {
  draw() {

    background(0);
    button(width/2,height-100, "I'M FEELING LUCKY");

    fill(255);
    text("What did you think of your results? What if you tried something different?", width/2, height/2);
  }
}

class Outro {

    draw() {
      background(0);
      button(width/2,height-100,"START OVER");

      fill(255);
      text("forcefeeding you the message of the game", width/2, height/2);
    }
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
