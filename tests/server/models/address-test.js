const sinon = require('sinon');
const expect = require('chai').expect;
const Sequelize = require('sequelize');
const db = require('../../../server/db');

const User = db.model('user');
const Address = db.model('address')

// OB/MS: nested create with assocations "eager create"
/*
User.create({
	...
	shippingAddresses: [{
		...
	}]
	...
}, {
	include: [{model: Address, as: 'shippingAddress'}]
})
*/
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

function createBillingAddress () {
	let add, usr;
	return Address.create({
		line1: 'this is a billing address',
		city: 'Seattle',
		state_region: 'Washington',
		country: 'USA',
		zipcode: 11111
	})	
	.then(function (address) {
		add = address;
		return createUser();
	})
	.then(function (user) {
		usr = user;
		return user.addBillingAddress(add)
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



beforeEach('Sync DB', function () {
	return db.sync({force:true})
});

describe("Address Model", function () {
	describe('has billing and shipping address methods', function () {
		// OB/MS: can use promises
		it('can add billing and shipping addresses', function (done) {
	        createUser()
	        .then(function (user) {
				expect(user.addBillingAddress).to.be.a('function');
				expect(user.addShippingAddress).to.be.a('function');
				done()
	        })		
	        .catch(done)		
		})
		it('can get billing and shipping addresses', function (done) {
			createUser()
			.then(function (user) {
				expect(user.getBillingAddresses).to.be.a('function');
				expect(user.getShippingAddresses).to.be.a('function');
				done();
			})
			.catch(done)
		})
	})

	describe('distinguishes between billing and shipping', function () {
		it('doesn\'t give us the billing address if we set a shipping address', function (done) {
			createShippingAddress()
			.then(function (user) {
				return user.getBillingAddresses()
			})
			.then(function (address){
				expect(address[0]).to.be.equal(undefined)
				done();
			})
			.catch(done)
		
		})
		it('doesn\'t give us the shipping address if we set a billing address', function (done) {
			createBillingAddress()
			.then(function (user) {
				return user.getShippingAddresses()
			})
			.then(function (address){
				expect(address[0]).to.be.equal(undefined)
				done();
			})
			.catch(done)
		})
		it('should return the right shipping address', function (done) {
			createShippingAddress()
			.then(function (user) {
				return user.getShippingAddresses()
			})
			.then(function (address){
				expect(address[0].city).to.be.equal('new york')
				done();
			})
			.catch(done)
		
		})
		it('should return the right billing address', function (done) {
			createBillingAddress()
			.then(function (user) {
				return user.getBillingAddresses()
			})
			.then(function (address){
				expect(address[0].city).to.be.equal('Seattle')
				done();
			})
			.catch(done)
		})

	})

})
