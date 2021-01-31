const App = require('./app/index.js')
const AppInstance = new App()

console.log('App instance ready...')

// const url = "https://jsonplaceholder.typicode.com/posts/1";
const url = "https://en.wikipedia.org/wiki/Long_jump";


AppInstance.fetch(url)
