class GenericScene {
  enter() {
    console.log("Scene: ", mgr.scene.oScene.constructor.name)
    serial.write(mgr.scene.oScene.constructor.name)
  }
}
