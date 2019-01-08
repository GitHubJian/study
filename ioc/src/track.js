class Track {
  constructor(options) {
    this.options = options
  }

  tracking() {
    console.log(`[Tracking log]: Tracking`)
  }
}

const init = app => {
  app.track = new Track(app.options.track)
  app.track.tracking()
}

module.exports = { init }
