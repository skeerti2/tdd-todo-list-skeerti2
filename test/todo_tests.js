const assert = require('assert')
const todos = require('../models/todo.js')

let todo

/*
 * Core methods
 * fundamental to running of all unit tests below
*/
// We must be able to access the Todo list
todos.destroyAll()
assert.deepEqual(todos.list(), [], 'List should return an array of all todos')

// We must be able to create a new Todo and store in Todos array
todos.destroyAll()
todos.create({
  name: 'Do laundry',
  description: 'wash 2 batches of clothes and dry them',
  completed: false
})
assert.strictEqual(todos.list().length, 1, 'Should be able to create new Todo object with 3 KVPs')
assert.strictEqual(todos.list()[0].hasOwnProperty('name'), true, 'Should have name property')
assert.strictEqual(todos.list()[0].hasOwnProperty('description'), true, 'Should have name property')
assert.strictEqual(todos.list()[0].hasOwnProperty('completed'), true, 'Should have name property')

// Example Test - we expect that when we run destroyAll, it should return true to let us know it was successful
assert.strictEqual(todos.destroyAll(), true, 'DestroyAll should return true, to indicate success')
// We also expect the list should now be empty
assert.strictEqual(todos.list().length, 0, 'List should be empty after DestroyAll is called')

/*
 * Create method
*/
todos.destroyAll()
todos.create({
  name: 'Do laundry',
  description: 'wash 2 batches of clothes and dry them',
  completed: false
})
todo = todos.list()[0]
assert.strictEqual(todo['name'], 'Do laundry', 'Todo object should have a "name" property')
assert.strictEqual(todo['description'], 'wash 2 batches of clothes and dry them', 'Todo object should have a "description" property')
assert.strictEqual(todo['completed'], false, 'Todo object should have a "completed" property')
assert.ok(todos.list()[0]._id, 'Todo object should have an automatically generated UUID')

todos.destroyAll()
todos.create({
  name: 'Fold clothes'
})
todo = todos.list()[0]
assert.ok(todo['description'], 'Should be able to create new Todo with just single param "name"')

todos.destroyAll()
assert.strictEqual(todos.create(), false, 'Should not be able to create Todo without providing "name" param')
assert.strictEqual(todos.create('Sell'), false, 'Should not be able to create Todo when name is less than 5 characters long')

/*
 * Show method
*/
todos.destroyAll()
todos.create({
  name: 'Buy groceries'
})
todo = todos.list()[0]
assert.equal(todos.show(todo._id), todos.list()[0], 'Show should return Todo object with specified id')
assert.strictEqual(todos.show('nonexistentUUID'), null, 'Show should return null if Todo with that id does not exist')

/*
 * Destroy by id method
*/
todos.destroyAll()
todos.create({
  name: 'Fix study lamp'
})
todo = todos.list()[0]
todos.destroy(todo._id)
assert.strictEqual(todos.list().length, 0, 'Destroy should delete Todo with specific id')

todos.destroyAll()
todos.create({
  name: 'Fix study lamp!!'
})
todo = todos.list()[0]
assert.strictEqual(todos.destroy(todo._id), true, 'Destroy(id) should return true if deletion is successful')
assert.strictEqual(todos.destroy('nonexistentUUID'), false, 'Destroy(id) should return true if deletion is unsuccessful')

/*
 * Update method
*/
todos.destroyAll()
todos.create({
  name: 'Book movie tickets'
})
let todoBeforeUpdate = Object.assign({}, todos.list()[0])
todos.update(todos.list()[0]._id, {
  name: 'Book movie tickets online at lunch',
  description: 'Try Lido then Cineleisure',
  completed: true
})
todo = todos.list()[0]
assert.notDeepEqual(todo, todoBeforeUpdate, 'Update should update Todo with specified id and new params')
assert.strictEqual(todo.name, 'Book movie tickets online at lunch', 'Update should update Todo name with specified value in params')
assert.strictEqual(todo.description, 'Try Lido then Cineleisure', 'Update should update Todo description with specified value in params')
assert.strictEqual(todo.completed, true, 'Update should update Todo completed status with specified value in params')

todos.destroyAll()
todos.create({
  name: 'Get onions',
  description: 'Get onions from pharmacy',
  completed: false
})
todo = todos.list()[0]
todos.update(todo._id, {description: 'Get onions from market, not pharmacy...'})
assert.strictEqual(todo.description, 'Get onions from market, not pharmacy...', 'Update should allow individual fields to be updated')
assert.strictEqual(todo.name, 'Get onions', 'Update should allow individual fields to be updated')
assert.strictEqual(todo.completed, false, 'Update should allow individual fields to be updated')

assert.strictEqual(todos.update(todo._id, {description: 'Get meds from pharmacy'}), true, 'Update should return true if successful')
assert.strictEqual(todos.update(todo._id), false, 'Update should return false if unsuccessful')

todos.destroyAll()
todos.create({
  name: 'Bring fruits to grandma'
})
todo = todos.list()[0]
assert.strictEqual(todos.update(todo._id, {name: ''}), false, 'Update should not allow name < 5 characters')
assert.strictEqual(todos.update(todo._id, {name: '1234'}), false, 'Update should not allow name < 5 characters')
