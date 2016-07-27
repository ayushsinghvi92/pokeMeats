// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Products Route', function () {

    var app, Product, product;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Product = db.model('product');
    });

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

	describe('All products request', function () {

		var agent;

		beforeEach('create agent', function () {
			agent = supertest.agent(app);
		});

		it('GET all', function (done) {
			// OB/MS: check out supertest-as-promised
			agent.get('/api/products')
				.expect(200)
		        .end(function (err, res) {
		          if (err) return done(err);
		          expect(res.body).to.be.instanceof(Array);
		          expect(res.body).to.have.length(1);
		          done();
		        });
		});

	});

	describe('Single product request', function () {

		var agent;

		beforeEach('create agent', function () {
			agent = supertest.agent(app);
		});

		it('GET one', function (done) {
			agent.get('/api/products/1')
				.expect(200)
		        .end(function (err, res) {
		          if (err) return done(err);
		          expect(res.body.name).to.equal(product.name);
		          expect(res.body.type).to.equal(product.type);
		          done();
		        });
		});

		it('GET one that doesn\'t exist', function (done) {
			agent
				.get('/api/products/12345')
				.expect(404)
				.end(done);
		});

	});

});