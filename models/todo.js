const uuidGenerator = require('uuid/v4')

var todos = []

// CREATE - params should be an object with keys for name, description and completed
function create (name, description, completed) {
  if (name && name.length >= 5) {
    todos.push({
      _id: uuidGenerator(),
      name: name,
      description: description || name,
      completed: completed || false
    })
  } else {
    return false
  }
}

// READ (list & show)
function list () {
  return todos
}
function show (id) {
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i]._id) {
      return todos[i]
    }
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, name, description, completed) {
  let todo = show(id)

  if (todo) {
    todo['name'] = name
    todo['description'] = description
    todo['completed'] = completed
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i]._id) {
      todos.splice(i, 1)
      return true
    }
  }
  return false
}

function destroyAll () {
  todos = []
  return true
}

module.exports = {
  create: create,
  list: list,
  show: show,
  update: update,
  destroy: destroy,
  destroyAll: destroyAll
}
