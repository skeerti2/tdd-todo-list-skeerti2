const uuidGenerator = require('uuid/v4')
const fs = require('fs')

let todos = require('../data.json').todos

function save () {
  const json = JSON.stringify({ todos: todos })
  fs.writeFileSync('data.json', json, 'utf8')
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (typeof params === 'object' && params.name.length >= 5) {
    let newTodo = {
      _id: uuidGenerator(),
      name: params.name,
      description: params.description || params.name,
      completed: params.completed || false
    }

    todos.push(newTodo)

    save()
    return true
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
    if (typeof params.completed === 'boolean') {
      todo.completed = params.completed
    }

    save()
    return true
  }
  return false
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  for (var i = 0; i < todos.length; i++) {
    if (id === todos[i]._id) {
      todos.splice(i, 1)

      save()
      return true
    }
  }
  return false
}

function destroyAll () {
  todos.length = 0

  save()
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
