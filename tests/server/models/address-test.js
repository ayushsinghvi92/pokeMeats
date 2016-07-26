const sinon = require('sinon');
const expect = require('chai').expect;
const Sequelize = require('sequelize');
const db = require('../../../server/db');

const User = db.model('user');
const Address = db.model('address')

function createShippingAddress () {
	let add, usr;
	return Address.create({
		line1: 'this is a shipping address',
		city: 'new york',
		state_region: 'new york',
		country: 'USA',
		zipcode: 12345
	})	
	.then(function (address) {
		add = address;
		return createUser();
	})
	.then(function (user) {
		usr = user;
		return user.addShippingAddress(add)
	})
	.then(address => usr)
}

function createUser () {
	return User.create({
		first_name: 'Test User',
		email: 'test@fsa.com',
		password: 'password'
	})
}

function createBillingAddress () {
	return Address.create({
		line1: 'this is a billing address',
		city: 'seattle',
		state_region: 'washington',
		country: 'USA',
		zipcode: 12345
	})	
}

beforeEach('Sync DB', function () {
	return db.sync({force:true})
});

describe('has billing address methods', function () {
	it('can add billing address', function () {
        createUser()
        .then(function (user) {
			expect(user.addBillingAddress).to.be.a('function');
        })
	})
	it('can get billing address', function () {
		createUser()
		.then(function (user) {
			expect(user.getBillingAddress).to.be.a('function');
		})
	})
})

describe('distinguishes between billing and shipping', function () {
	it('doesn\'t give us the billing address if we set a shipping address', function () {
		createShippingAddress()
		.then(function (user) {
			return user.getShippingAddress()
		})
		.then(function (address){
			return expect(address.city).to.be.equal('new york')
		})
	})
})