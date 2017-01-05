const todos = require('./models/todo.js')
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const prefix = '> '

// This helper function simply console logs all of the supported commands
function displayHelp () {
  console.log('Please input one of the following commands')
  console.log(' "create [name] [description] [completed]" will create a new todo')
  console.log(' "list" will list all todos')
  console.log(' "show [id]" will show the TODO with the given id')
  console.log(' "update [id] [name] [description] [completed]" will update the TODO with the given id')
  console.log(' "destroy [id]" will delete the TODO with the given id')
  console.log(' "destroyAll" will delete all todos')
  console.log(' "quit" will exit the application')
  console.log(' "help" will list the supported commands')
}
// this function turns a boolean value into a more human friendly message
function successMessage (success) {
  return success ? 'succeeded' : 'failed'
}

// using readline, we can create a loop that reads every new line the user enters
rl.on('line', (line) => {
  // a very basic REPL, we simply split the user input into a series of words and use those to dictate our actions
  let words = line.trim().split(' ')
  let success = false
  switch (words[0]) {
    case 'create':
      // we use the 2nd, 3rd & 4th words the user input as the name, description and completed status of our new todo
      success = todos.create({name: words[1], description: words[2], completed: words[3]})
      console.log('TODO creation ' + successMessage(success))
      break
    case 'list':
      console.log(todos.list())
      break
    case 'show':
      console.log(todos.show(words[1]))
      break
    case 'update':
      success = todos.update(words[1], {name: words[2], description: words[3], completed: words[4]})
      console.log('TODO update ' + successMessage(success))
      break
    case 'destroy':
      success = todos.destroy(words[1])
      console.log('TODO destroy ' + successMessage(success))
      break
    case 'destroyAll':
      success = todos.destroyAll()
      console.log('TODO destroy ' + successMessage(success))
      break
    case 'quit':
      rl.close()
      return
    case 'help':
      displayHelp()
      break
    default:
      console.log('That is not a valid option')
      displayHelp()
      break
  }
  rl.setPrompt(prefix, prefix.length)
  rl.prompt()
}).on('close', function () {
  process.exit(0)
})

console.log('TODO LIST APP')
displayHelp()
rl.setPrompt(prefix, prefix.length)
rl.prompt()
