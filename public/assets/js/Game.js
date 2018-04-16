class Game {
  setup() {
    // TODO: replace this
    // if (you==hispf || you==hispm){
    //   if (inc > 800){
    //     mask = mask1b;
    //   }
    //   if (inc <= 800 && inc > 400){
    //     mask = mask2a;
    //   }
    //   if (inc <= 400){
    //     mask = mask3a;
    //   }
    // }
    //
    // if (you==blackf || you==blackm){
    //   if (inc > 800){
    //     mask = mask1b;
    //   }
    //   if (inc <= 800 && inc > 400){
    //     mask = mask2b;
    //   }
    //   if (inc <= 400){
    //     mask = mask3b;
    //   }
    // }
    //
    // if (you==asianf || you==asianm){
    //   if (inc > 800){
    //     mask = mask1a;
    //   }
    //   if (inc <= 800 && inc > 400){
    //     mask = mask2a;
    //   }
    //   if (inc <= 400){
    //     mask = mask3a;
    //   }
    // }
    //
    // if (you==whitef || you==whitem){
    //   if (inc > 800){
    //     mask = mask1a;
    //   }
    //   if (inc <= 800 && inc > 400){
    //     mask = mask1b;
    //   }
    //   if (inc <= 400){
    //     mask = mask2a;
    //   }
    // }
  }

  draw() {
    background(mapImage, 1);

    image(mask, 0, 0, width, height);
    image(you, width-100, 0, 100, 100);
  }
}
