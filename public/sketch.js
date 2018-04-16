var portName = '/dev/cu.usbmodem14621';
var options = { baudrate: 115200 };
var serial;
var inData;

let mgr;
let you;

let mask;

let race_slider;
let race;

let inc_slider;
let inc;

let edu_slider;
let edu;

let buttonPressed;

let buttonW = 200;
let buttonH = 50;

let selections = {};
let incomeLabels = [
  "black",
  "hispanic",
  "other",
  "asian",
  "white",
];
let raceLabels = [
  "lower",
  "middle",
  "upper-middle",
  "upper",
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

    race_slider = createSlider(0, 1000, 100);
    race = race_slider.value();
    race_slider.position(10, 10);

    inc_slider = createSlider(0, 1000, 100);
    inc = inc_slider.value();
    inc_slider.position(10, 50);

    edu_slider = createSlider(0, 1000, 100);
    edu = edu_slider.value();
    edu_slider.position(10, 90);

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene ( Intro );
    mgr.addScene ( Profile );
    mgr.addScene ( Game );
    mgr.addScene ( Prompt );
    mgr.addScene ( Outro );

    // mgr.showNextScene();
    mgr.showScene( Debug );

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

    //== Income
    case 'Q':
      selections.income = 0;
      break;
    case 'W':
      selections.income = 1;
      break;
    case 'E':
      selections.income = 2;
      break;
    case 'R':
      selections.income = 3;
      break;

    //== Income
    case 'Q':
      selections.income = 0;
      break;
    case 'W':
      selections.income = 1;
      break;
    case 'E':
      selections.income = 2;
      break;
    case 'R':
      selections.income = 3;
      break;

    //== Race
    case 'A':
      selections.race = 0;
      break;
    case 'S':
      selections.race = 1;
      break;
    case 'D':
      selections.race = 2;
      break;
    case 'F':
      selections.race = 3;
      break;
    case 'G':
      selections.race = 4;
      break;

    //== Education
    case 'Z':
      selections.education = 0;
      break;
    case 'X':
      selections.education = 1;
      break;
    case 'C':
      selections.education = 2;
      break;
    case 'V':
      selections.education = 3;
      break;
    case 'B':
      selections.education = 4;
      break;

    case 'I':
      pressedReset();
      break;
    case 'O':
      pressedSearch();
      break;
    case 'P':
      pressedRandom();
      break;
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

class Intro {
  draw() {
      background(mapImage,1);
      fill(255);
      rect(width/2,height/2,500,200);
      fill(0);
      text("Welcome to housingsearch.com!", width/2, height/2-30);
      text("We're here to help you find the perfect home. :)", width/2, height/2);
      text("TURN THE KNOBS TO START.", width/2, height/2+40);
      // button(width/2,height/2+50, "START")
  }
}

class Profile {
  draw() {
      background(0);

      button(width/2,height-100, "SEARCH");

      fill(255);
      text("First, tell us a little bit about who you are.", width/2, height/4);
      text("you are this person!", width/2, height-height/3);
      image(you, width/2-100,height/4+30,200,200);

      race = race_slider.value();
      inc = inc_slider.value();
      edu = edu_slider.value();

      push();
        textSize(14);
        text("race is " + race, 200, 25);
        text("income is " + inc, 200, 65);
        text("edu is " + edu, 200, 105);
      pop();

      if (race >= 0 && race< 250) {
        if (edu >= inc){
          you = blackf;
        }

        else if (edu < inc){
          you = blackm;
        }
      }

      if (race >= 250 && race< 500) {
        if (edu >= inc){
          you = whitef;
        }

        if (edu < inc){
          you = whitem;
        }
      }

      if (race >= 500 && race<750) {
        if (edu >= inc){
          you = asianf;
        }

        if (edu < inc){
          you = asianm;
        }
      }

      if (race >= 750 && race<1000) {
        if (edu >= inc){
          you = hispf;
        }

        if (edu < inc){
          you = hispm;
        }
      }
    }
}

class Game {

  draw() {
    background(mapImage,1);

    if (you==hispf || you==hispm){
      if (inc > 800){
      mask = mask1b;
      }
      if (inc <= 800 && inc > 400){
      mask = mask2a;
      }
      if (inc <= 400){
      mask = mask3a;
      }
    }

    if (you==blackf || you==blackm){
      if (inc > 800){
      mask = mask1b;
      }
      if (inc <= 800 && inc > 400){
      mask = mask2b;
      }
      if (inc <= 400){
      mask = mask3b;
      }
    }

    if (you==asianf || you==asianm){
      if (inc > 800){
      mask = mask1a;
      }
      if (inc <= 800 && inc > 400){
      mask = mask2a;
      }
      if (inc <= 400){
      mask = mask3a;
      }
    }

    if (you==whitef || you==whitem){
      if (inc > 800){
      mask = mask1a;
      }
      if (inc <= 800 && inc > 400){
      mask = mask1b;
      }
      if (inc <= 400){
      mask = mask2a;
      }
    }

    image(mask, 0,0,width,height);

    // fill(255,0,0);
    // text("STUFF HAPPENS ON THE MAP!", width/2, height/2);
    image(you, width-100,0,100,100);
    // button(width/2,height-100, "TRY AGAIN");

  }
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

// R1: 0-79
// R2: 80-159
// R3: 160-239
// B1: 300
// B2: 301
// B3: 302
function serialEvent() {
  let inString = serial.readLine();

  if (inString.length <= 0) return;

  inData = Number(inString);
  console.log("inData: ", inData);

  // IT'S A BUTTON!
  if (inData >= 300) {
    switch(inData) {
      case 300:
        pressedReset();
        break;
      case 301:
        pressedSearch();
        break;
      case 302:
        pressedRandom();
        break;
    }
    return;
  }

  if (inData >= 0 && inData < 80) {
     // NB. we do 80, which we'll never hit so our range is really 0-4
    selections.income = floor(map(inData, 0, 80, 0, 5));
  }

  if (inData >= 80 && inData < 160) {
     // NB. we do 160, which we'll never hit so our range is really 0-3
    selections.race = floor(map(inData, 80, 160, 0, 4));
  }

  if (inData >= 160 && inData < 240) {
    // NB. we do 240, which we'll never hit so our range is really 0-3
    selections.education = floor(map(inData, 160, 240, 0, 5));
  }
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
