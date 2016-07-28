const expect = require('chai').expect;
const Sequelize = require('sequelize');
const db = require('../../../server/db');
const Product = db.model('product');
const Order = db.model('orders')
const User = db.model('user')
const supertest = require('supertest');

beforeEach('sync db', function () {
	app = require('../../../server/app')(db)
	return db.sync({force:true})
})

let testUser;
beforeEach('Creating a User', function(){
  return User.create({
    first_name: 'Test User',
    email: 'test@fsa.com',
    password: 'password'
  })
  .then(function(newUser){
    testUser = newUser;
  })
})



let product;
beforeEach('create product', function () {
	return Product.create({
		name: "Charizard Tail",
		type: "fire",
		price: 100
	})
	.then(function(prod){
		product = prod;
	})
});

let order;
beforeEach('createOrder', function () {
	return Order.create()
	.then(function (odr) {
		order = odr;
	})
})

let orderWithUser;
beforeEach('createOrder', function () {
  return Order.create({
    userId : 1
  })
  .then(function (odr) {
    orderWithUser = odr;
  })
})

let agent;
beforeEach('create agent', function () {
	agent = supertest.agent(app)
})

describe('These are POST Routes: order routes are working and they can', function () {

	it('adds a new item to order', function (done) {
		return agent.post('/api/orders/'+order.id)
		.send({product:product, quantity:10})
		.expect(200)
		.end(done)
	})

  it('Does not add to unauthorized order', function (done) {
    return agent.post('/api/orders/'+orderWithUser.id)
    .send({product:product, quantity:10})
    .expect(403)
    .end(done)
  })

})

describe('These are PUT Routes: where you can adjust the quantity of a product', function(){

  beforeEach('adds a new item to order', function (done) {
    return agent.post('/api/orders/'+order.id)
    .send({product:product, quantity:10})
    .end(done)
  });

  it('adjusts the product quantity', function(done){
    return agent.put('/api/orders/'+ order.id)
    .send({product:product, quantity: 5})
    .expect(200)
    .end(done)
  })

  it('Does not add to unauthorized order', function (done) {
    return agent.put('/api/orders/'+orderWithUser.id)
    .send({product:product, quantity:10})
    .expect(403)
    .end(done)
  })

})

describe('These are the Delete Routes: Where you can delete a product from an order', function(){
  beforeEach('adds a new item to order', function (done) {
    return agent.post('/api/orders/'+order.id)
    .send({product:product, quantity:10})
    .end(done)
  });

  it('deletes the product from the order', function(done){
    return agent.delete('/api/orders/' + order.id)
    .send({product:product})
    .expect(200)
    .end(done)
  })
})

