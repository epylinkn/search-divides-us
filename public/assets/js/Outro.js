class Outro {
  draw() {
    background(0);
    button(width/2,height-100,"START OVER");

    fill(255);

    textSize(25);
    text("WHAT JUST HAPPENED?",width/2,200);

    textSize(25);
    textLeading(40);
    text(
      squish(`
        What happens when you and a complete stranger both search for the same keyword?
        Most likely, you’ll get different results.

        As our everyday internet services learn more about us, our travel paths online
        become surprisingly segregated. These divergent paths can be as harmless
        as music tastes, or as consequential as where we live.
      `),
      width/2,
      height/2 - 200
    );
  }
}
