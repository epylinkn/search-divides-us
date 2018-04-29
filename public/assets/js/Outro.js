class Outro {
  enter() {
    setTimeout(restartGame, 30 * 1000);
  }

  draw() {
    background(browser,0,0,width,height);

    // TODO: replace this...
    fill("pink")
    ellipse(120, 90, 50, 50);

    fill('white')
    textSize(16)
    text("START OVER", 120, 130, 125, 50);

    textSize(30);
    text("AS SEGREGATED AS A CITY?",width/2,200);

    textSize(20);
    textLeading(35);
    text(
      squish(`
        What happens when you and a stranger both search for the same keyword?
        Most likely, you’ll get different results.

        As our everyday internet services learn about us, our travel paths
        online become increasingly segregated. These divergent paths can be as harmless
        as music tastes, or as consequential as where we live.
      `),
      width/2,
      height/2 - 200
    );
  }
}
