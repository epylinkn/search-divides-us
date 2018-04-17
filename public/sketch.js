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


// let age_slider;
// let age;

let edu_slider;
let edu;

let buttonPressed;

let buttonW = 200;
let buttonH = 50;

let selections = {}

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



    mgr = new SceneManager();

    createCanvas(1100, 800);

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

function keyPressed()
{
    // You can optionaly handle the key press at global level...
    switch(key)
    {
        case '0':
            mgr.showScene( Debug );
            break;
        case '1':
        console.log("1 is pressed");
            mgr.showScene( Intro );
            break;
        case '2':
        console.log("2 is pressed");

            mgr.showScene( Profile );
            break;
        case '3':
        console.log("3 is pressed");

            mgr.showScene( Game );
            break;
        case '4':
        console.log("4 is pressed");
            mgr.showScene( Prompt );
            break;
        case '5':
        console.log("5 is pressed");
            mgr.showScene( Outro );
            break;
    }

    // ... then dispatch via the SceneManager.
    mgr.keyPressed();
}

function button(x,y, buttonText){
  push();
  fill(225,0,225);
  rect(x,y,buttonW,buttonH);
  fill(255);
  text(buttonText, x,y+5);
  pop();
}

class Debug {
  draw() {
    background(0);
    displaySelections();

    if (millis() < lastTitleAt) {
      displayTitle(message);
    }
  }
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
        debounceTitle("RESET PRESSED");
        break;
      case 301:
        debounceTitle("SEARCH PRESSED");
        break;
      case 302:
        debounceTitle("RANDOMIZE PRESSED");
        break;
    }
    return;
  }

  if (inData >= 0 && inData < 80) {
     // NB. we do 80, which we'll never hit so our range is really 0-4
    selections.race = floor(map(inData, 0, 80, 0, 5));
  }

  if (inData >= 80 && inData < 160) {
     // NB. we do 160, which we'll never hit so our range is really 0-3
    selections.income = floor(map(inData, 80, 160, 0, 4));
  }

  if (inData >= 160 && inData < 240) {
    // NB. we do 240, which we'll never hit so our range is really 0-3
    selections.education = floor(map(inData, 160, 240, 0, 5));
  }
  console.log(selections);
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function displaySelections() {
  if (!selections || Object.keys(selections).length == 0) return;

  let i = 0;
  let yHeight = windowHeight / Object.keys(selections).length;
  for (let key in selections) {
    let selection = selections[key];
    push()
    fill('magenta')
    textAlign(CENTER, CENTER)
    textSize(64)
    text(key + ": " + selection, 300, i * yHeight, windowWidth, windowHeight)
    pop()

    i++;
  }
}

let message;
let lastTitleAt;
function debounceTitle(title) {
  lastTitleAt = millis() + 2000;
  message = title;
}

function displayTitle(title) {
  push()
  rectMode(CORNER)
  fill('white')
  textAlign(CENTER, CENTER)
  textSize(64)
  text(title, 0, 0, windowWidth, windowHeight)
  pop()
}
