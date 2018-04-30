let portName = '/dev/cu.usbmodem14321';
let options = { baudrate: 115200 };
let serial;

let mgr;
let you;
let youLookup;

let masks;
let mask;
let neighborhood;

let buttonPressed;

let buttonSound;
let randomSound;

let buttonW = 200;
let buttonH = 50;

let firstPlay = true;

let selections = {};
let incomeValues = [
  "lower",
  "middle",
  "upper-middle",
  "upper",
];
let incomeLabels = [
  "lower",
  "middle",
  "upper middle",
  "upper",
];
let raceValues = [
  "black",
  "hispanic",
  "other",
  "asian",
  "white",
];
let raceLabels = [
  "black",
  "hispanic",
  "other",
  "asian",
  "white",
];
let educationValues = [
  "less-than-high-school",
  "high-school",
  "some-college",
  "bachelors",
  "advanced",
];
let educationLabels = [
  "some high school",
  "high school",
  "some college",
  "Bachelor's Degree",
  "Advanced Degree",
];

let sceneLookup = {
  Intro: Intro,
  Profile: Profile,
  Searching: Searching,
  Game: Game,
  Explore: Explore,
  Prompt: Prompt,
  RandomProfile: RandomProfile,
  RandomGame: RandomGame,
  Outro: Outro
}

function preload(){
  roboto = loadFont('assets/fonts/RobotoMono.ttf');

  //misc assets
  searchIcon = loadImage('assets/images/search-icon.png');
  button_search = loadImage('assets/images/button_search.png')
  welcome = loadImage('assets/images/welcome.png');

  //map and browser frame
  mapImage = loadImage('assets/images/map.png');
  mapTeaser = loadGif('assets/images/map_teaser.gif');

  browser = loadImage('assets/images/browser.png')

  //pngs as scenes (lol)
  lever = loadImage('assets/images/lever.png')
  explore = loadImage('assets/images/whathappened.png')
  outro = loadImage('assets/images/end.png')

  //demographics
  blackf = loadImage('assets/images/black-f.png');
  whitef = loadImage('assets/images/white-f.png');
  hispf = loadImage('assets/images/hispanic-f.png');
  asianf = loadImage('assets/images/asian-f.png');
  otherf = loadImage('assets/images/other-f.png');

  //set "you"
  you = blackf;

  youLookup = {
    "black": blackf,
    "hispanic": hispf,
    // "other": ???
    "asian": asianf,
    "white": whitef,
    "other": otherf,
  }

  masks = [
    loadImage('assets/images/mask6.png'), // worst
    loadImage('assets/images/mask5.png'),
    loadImage('assets/images/mask4.png'),
    loadImage('assets/images/mask3.png'),
    loadImage('assets/images/mask2.png'),
    loadImage('assets/images/mask1.png'), // best
  ]

  randommasks = [
    loadImage('assets/images/randommask6.png'),
    loadImage('assets/images/randommask5.png'),
    loadImage('assets/images/randommask4.png'),
    loadImage('assets/images/randommask3.png'),
    loadImage('assets/images/randommask2.png'),
    loadImage('assets/images/randommask1.png'),
  ]


  soundFormats('mp3', 'ogg');
  buttonSound = loadSound('assets/sounds/game-sound-correct-131660.mp3');
  // buttonSound = loadSound('assets/sounds/acme-siren-331610.mp3');
  // buttonSound = loadSound('assets/sounds/pipe9-13290.mp3');

  randomSound = loadSound('assets/sounds/slot-payoff-69690.mp3');
}

function setup() {
  mgr = new SceneManager();

  serial = new p5.SerialPort();
  serial.on('open', portOpen);
  serial.on('error', serialError);
  serial.on('data', serialEvent);
  serial.on('close', portClose);

  serial.list();
  serial.open(portName, options);
  serial.clear();

  createCanvas(1350, 885);

  rectMode(CENTER);
  textAlign(CENTER);

  textFont(roboto);
  textSize(16);

  // Preload scenes. Preloading is normally optional
  // ... but needed if showNextScene() is used.
  mgr.addScene(Intro);
  mgr.addScene(Profile);
  mgr.addScene(Searching);
  mgr.addScene(Game);
  mgr.addScene(Explore);
  mgr.addScene(Prompt);
  mgr.addScene(RandomProfile);
  mgr.addScene(RandomGame);
  mgr.addScene(Outro);

  mgr.showScene(Intro);

  let xs = [[2,1,1],[0,3,3],[1,0,2],[4,2,1]]
  let ys = [[393,height/2],[382,10],[387,height/5*2],[409,height-10]]
  mlModel.train(xs, ys);
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

  // dispatch via the SceneManager.
  mgr.keyPressed();

  switch(key) {
    //== Scenes
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
      let nextScene = Object.values(sceneLookup)[key];
      mgr.showScene( nextScene )
      break;

    case '9':
      mgr.showScene( ModelTrainer );
      break;

    case ' ':
      mgr.showNextScene();
      break;

    case 'I':
      restartGame()
      break;
  }
}

function restartGame() {
  neighborhood = undefined
  mask = undefined
  you = blackf
  firstPlay = true

  selections = {}
  select("#inc-label").html("---");
  select("#race-label").html("---");
  select("#edu-label").html("---");

  mgr.showScene( Intro )
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

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  // NB. Broadcast what arduino repeats back!
  print(serial.readLine())
}

// Utilities
function squish(str) {
  return str.replace(/ +(?= )/g,'');
}

function placeholder(str) {
  return (str === undefined) ? "---" : str;
}

function displayInstruction(str) {
  push();

  fill("white")
  textAlign(CENTER, CENTER)
  textSize(width / 50);
  text(str, width/2, height-50);

  pop();
}

function changeYou(){
  if(selections.race == 0){
    you = blackf;
  }
  if(selections.race == 1){
    you = hispf;
  }
  if(selections.race == 2){
    you = otherf;
  }
  if(selections.race == 3){
    you = asianf;
  }
  if(selections.race == 4){
    you = whitef;
  }
}
