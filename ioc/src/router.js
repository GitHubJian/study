class Router {
  constructor(options) {
    this.options = options
    console.log(this.options.mode)
  }
  
  to(path) {
    console.log(`[Router log]: To ${path}`)
  }
}

const init = app => {
  let options = app.options.router
  app.router = new Router(options)
  app.router.to('home')
}

module.exports = { init }
