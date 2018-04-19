class Outro {
  draw() {
    background(0);
    button(width/2,height-100,"START OVER");

    fill(255);
    textSize(16);

    text(
      squish(`
        On the internet, there’s no easy way of telling who is visiting. \n
        However, the internet is far from raceless; in fact, \n
        most of the internet is targeted at one demographic in particular. \n
      `),
      width/2,
      height/2 - 200
    );
  }
}
