const assert = require('assert')
const todos = require('../models/todo.js')

// Example Test - we expect that when we run destroyAll, it should return true to let us know it was successful
assert.strictEqual( todos.destroyAll() , true, 'DestroyAll should return true, to indicate success')
// We also expect the list should now be empty
assert.strictEqual( todos.list().length , 0, 'List should be empty after deleting all TODOs')
