const assert = require('assert')
const todos = require('../models/todo.js')

/*
 * Core methods for rest of tests to operate
*/
// We must be able to access the Todo list
assert.deepEqual(todos.list(), [], 'List should return an array of all todos')

// We must be able to create a new Todo and store in Todos array
todos.create('Do laundry', 'wash 2 batches of clothes and dry them', false)
assert.strictEqual(todos.list().length, 1, 'Should be able to create new Todo object with 3 params (name, description, completed)')

// Example Test - we expect that when we run destroyAll, it should return true to let us know it was successful
assert.strictEqual(todos.destroyAll(), true, 'DestroyAll should return true, to indicate success')
// We also expect the list should now be empty
assert.strictEqual(todos.list().length, 0, 'List should be empty after DestroyAll is called')

/*
 * Create method
*/
todos.destroyAll()
todos.create('Do laundry', 'wash 2 batches of clothes and dry them', false)
assert.strictEqual(todos.list()[0]['name'], 'Do laundry', 'todo object should have a "name" property')
assert.strictEqual(todos.list()[0]['description'], 'wash 2 batches of clothes and dry them', 'todo object should have a "description" property')
assert.strictEqual(todos.list()[0]['completed'], false, 'todo object should have a "completed" property')
assert.ok(todos.list()[0]._id, 'Todo object should have an automatically generated UUID')

todos.destroyAll()
todos.create('Fold clothes')
assert.ok(todos.list()[0]['description'], 'Should be able to create new Todo with just single param "name"')

todos.destroyAll()
assert.strictEqual(todos.create(), false, 'Should not be able to create Todo without providing "name" param')
assert.strictEqual(todos.create('Sell'), false, 'Should not be able to create Todo when name is less than 5 characters long')

/*
 * Show method
*/
todos.destroyAll()
todos.create('Buy groceries')
var idToCheck = todos.list()[0]._id
assert.equal(todos.show(idToCheck), todos.list()[0], 'Show should return Todo object with specified id')
assert.strictEqual(todos.show('nonexistentUUID'), null, 'Show should return null if Todo with that id does not exist')

/*
 * Destroy by id method
*/
todos.destroyAll()
todos.create('Fix study lamp')
var idToDelete = todos.list()[0]._id
todos.destroy(idToDelete)
assert.strictEqual(todos.list().length, 0, 'Destroy should delete Todo with specific id')

todos.destroyAll()
todos.create('Fix study lamp!!')
var idToDelete2 = todos.list()[0]._id
assert.strictEqual(todos.destroy(idToDelete2), true, 'Destroy(id) should return true if deletion is successful')
assert.strictEqual(todos.destroy('nonexistentUUID'), false, 'Destroy(id) should return true if deletion is unsuccessful')

/*
 * Update method
*/
todos.destroyAll()
todos.create('Book movie tickets')
var todoBeforeUpdate = Object.assign({}, todos.list()[0])
todos.update(todos.list()[0]._id, 'Book movie tickets online at lunch', 'Try Lido then Cineleisure', false)
assert.notDeepEqual(todos.list()[0], todoBeforeUpdate, 'Update should update Todo with specified id and new params')

// Should allow individual fields to be updated

// Should NOT allow a name to be changed to blank or less than 5 characters in length
// Should return true if an update is successful, false if otherwise
