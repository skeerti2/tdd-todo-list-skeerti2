const uuidGenerator = require('uuid/v4')

const todos = []

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  // uuid usage exmaple
  // let uuid = uuidGenerator()
}

// READ (list & show)
function list () {
  return todos
}
function show (id) {}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, updatedParams) {}

// DESTROY (destroy & destroyAll)
function destroy (id) {}
function destroyAll () {
  return true
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
