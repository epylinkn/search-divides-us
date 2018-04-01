var mgr;

function setup()
{
    createCanvas(600, 500);

    mgr = new SceneManager();

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene ( Intro );
    mgr.addScene ( Game );
    mgr.addScene ( Outro );

    // mgr.showNextScene();
    mgr.showScene( Intro );

}

function draw()
{
    mgr.draw();
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

            mgr.showScene( Game );
            break;
        case '3':
        print("3 is pressed");

            mgr.showScene( Outro );
            break;
    }

    // ... then dispatch via the SceneManager.
    mgr.keyPressed();
}


function Intro(){
    this.setup = function(){
    }

    this.draw = function() {
      background(255);
      fill(0);
      text("welcome to optimization city. intro text!", width/2, height/2);
    }
}


function Game(){
  this.setup = function(){
  }

  this.draw = function() {
    background(0);
    fill(255);
    text("MAP GOES HERE", width/2, height/2)
  }

}

function Outro(){
    this.setup = function(){
    }

    this.draw = function() {
      background(255);
      fill(0);

      text("forcefeeding you the message of the game", width/2, height/2);
    }
}
