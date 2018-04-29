class Prompt extends GenericScene {
  draw() {
    let yHeight;

    background(lever, 0,0,width,height);
    fill(255);
  }

  keyPressed() {
    switch(key) {
      case 'P':
        this.sceneManager.showScene( RandomProfile );
        break;
    }
  }
}
