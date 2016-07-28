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
let agent;
beforeEach('create agent', function () {
	agent = supertest.agent(app)
})

describe('order routes are working and they can', function () {

	it('adds a new item to order', function (done) {
		console.log('reached here')
		return agent.post('/api/orders/'+order.id)
		.send({product:product, quantity:10})
		.expect(200)
		.end(done)
	})

})