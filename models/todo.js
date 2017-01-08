const uuidGenerator = require('uuid/v4')

var todos = []

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (typeof params === 'object' && params.name.length >= 5) {
    todos.push({
      _id: uuidGenerator(),
      name: params.name,
      description: params.description || params.name,
      completed: params.completed || false
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
function update (id, params) {
  let todo = show(id)

  if (todo && typeof params === 'object') {
    if ((params.name && params.name.length < 5) || params.name === '') {
      return false
    }

    todo.name = params.name || todo.name
    todo.description = params.description || todo.description
    todo.completed = params.completed || todo.completed

    return true
  }
  return false
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
