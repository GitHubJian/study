const Router = require('./router.js')
const Track = require('./track.js')
const App = require('./app.js')

App.use([Router, Track])

new App({
  router: {
    mode: 'history'
  },
  track: {},
  onReady(app) {
    console.log(`[App log]: App is Ready`)
  }
})
