const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// Write tests here
// need to look at todos
// // Use Assert to Test the functionality of all your CRUD methods e.g.
 var list2 = {name: "hw", description: "todays assignement", completed: true }
var list1 = {name: "hisomething", description: "something", completed: true }
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
// assert.ok(true)
// todos.create({name: "hi"})
assert.deepStrictEqual(todos.create(list1), true, 'obj not created' )
assert.deepStrictEqual(todos.create(list2), false, 'name is greater than 5') //checks if name.length < 2
// console.log(todos.list())
assert.deepStrictEqual(todos.list()[0].hasOwnProperty('_id'), true, 'id doesnt exist')
// assert.ok(todos.show(todos.list()[0]['_id']))
var myId = todos.list()[0]['_id']
console.log(myId)
console.log(todos.show(myId))
assert.strictEqual(todos.show(myId),todos.list()[0], 'doesnt return an object' )
// console.log(todos.list()[0]['_id'])
// var showOp = todos.show(myId)
// console.log(showOp)
// assert.ok(todos.create.params['_id'])
// assert.deepStrictEqual(todos.show('_id'), '_id', 'it doesnt have an id')

// assert.deepStrictEqual(typeof todos[0]['name'], 'string', 'name not a string')
