class Game {
  draw() {
    background(browser, 1);
    image(mapImage, 0,0,width,height);

    push();
    imageMode(CENTER)
    image(mask, width/2, height/2, width, height);
    pop();

    image(you, 1350, 80, 100,100);
  }
}
