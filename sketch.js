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

let buttonText = "click me";
let buttonPressed;

function preload(){
  map = loadImage('assets/notmanhattan.png');

  blackf = loadImage('assets/bf.jpg');
  whitef = loadImage('assets/wf.jpg');
  hispf = loadImage('assets/hf.jpg');
  asianf = loadImage('assets/af2.jpg');

  blackm = loadImage('assets/bm.jpg');
  whitem = loadImage('assets/wm.jpg');
  hispm = loadImage('assets/hm.jpg');
  asianm = loadImage('assets/am.jpg');

  best = loadImage('assets/mask1.png');
  average = loadImage('assets/mask2.png');
  worst= loadImage('assets/mask3.png');

  you = blackf;
  mask = average;

}
function setup()
{
    mgr = new SceneManager();

    textAlign(CENTER);
    createCanvas(1100, 700);

    rectMode(CORNER);
    fill(0);
    rect(10,140,80,200);
    fill(255);
    text(buttonText, 10,140);

    if (mouseIsPressed && mouseX > 10 && mouseX <90 && mouseY > 140 && mouseY <340){
        buttonPressed == true;
      }
    else {
        buttonPressed == false;
      }

    rectMode(CENTER);

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
    mgr.showScene( Intro );

}

function showNextScene() {
    mgr.showNextScene();
}

function draw()
{
    mgr.draw();
    textSize(20);
    print(buttonPressed);
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
        case '1':
        print("1 is pressed");
            mgr.showScene( Intro );
            break;
        case '2':
        print("2 is pressed");

            mgr.showScene( Profile );
            break;
        case '3':
        print("3 is pressed");

            mgr.showScene( Game );
            break;
        case '4':
        print("4 is pressed");
            mgr.showScene( Prompt );
            break;
        case '5':
        print("5 is pressed");
            mgr.showScene( Outro );
            break;
    }

    // ... then dispatch via the SceneManager.
    mgr.keyPressed();
}


class Intro {
  draw() {
      textAlign(CENTER);
      background(map,1);
      fill(255);
      rect(width/2,height/2-10,500,100);
      fill(0);
      text("Welcome to housingsearch.com!", width/2, height/2-20);
      text("We're here to help you find the perfect home. :)", width/2, height/2+20);
  }

}

class Profile {
  draw() {
      background(0);
      fill(255);
      text("First, tell us a little bit about who you are.", width/2, height/4);
      text("you are this person!", width/2, height/2);
      image(you, width/2-50,height/4+30,100,100);

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
    next = "SEARCH!";

    background(map,1);

    if (you==hispf || you==hispm){
      mask = worst;
    }

    if (you==blackf || you==blackm){
      mask = worst;
    }

    if (you==asianf || you==asianm){
      mask = average;
    }

    if (you==whitef || you==whitem){
      mask = best;
    }

    image(mask, 0,0,width,height);

    // fill(255,0,0);
    // text("STUFF HAPPENS ON THE MAP!", width/2, height/2);
    image(you, width-100,0,100,100);

  }
}

class Prompt {
  draw() {
    background(159,212,255);
    fill(0);
    text("What did you think of your results? What if you tried something different?", width/2, height/2);
  }
}


class Outro {
    draw() {
      background(0);
      fill(255);
      text("forcefeeding you the message of the game", width/2, height/2);
    }
}
