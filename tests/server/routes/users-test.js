// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Users Route', function () {

    var app, User, Order, user;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
        Order = db.model('orders');
    });

	beforeEach('create user', function () {
		return User.create({
			first_name: "foo",
			last_name: "bar",
			email: "foo@bar.com",
			password: "foobar"

		})
		.then(function(_user){
			user = _user;
		})
	});

	describe('All users request', function () {

		var agent;

		beforeEach('create agent', function () {
			agent = supertest.agent(app);
		});

		it('GET all', function (done) {
			agent.get('/api/users')
				.expect(200)
		        .end(function (err, res) {
		          if (err) return done(err);
		          expect(res.body).to.be.instanceof(Array);
		          expect(res.body).to.have.length(1);
		          done();
		        });
		});

	});

	describe('Single user request', function () {

		var agent;

		beforeEach('create agent', function () {
			agent = supertest.agent(app);
		});

		// COME BACK TO THIS TEST
		// it('GET one', function (done) {
		// 	agent
		// 		.get('/api/users/1')
		// 		.expect(200)
		//         .end(function (err, res) {
		//           if (err) return done(err);
		//           expect(res.body).to.equal(user);
		//           done();
		//     });
		// });


	});

	describe('Update user info', function () {

		var agent;

		beforeEach('create agent', function () {
			agent = supertest.agent(app);
		});

		it('checks that updates were correctly applied', function (done) {
			agent
				.put('/api/users/1')
				.send({
					first_name: "blah"
				})
				.expect(200)
				.end(function(err, res){
		          if (err) return done(err);
		          expect(res.body.first_name).to.equal("blah")
		          done();
				})
				
		});

	});


	describe('Create/delete an order for a user', function () {

		var agent;

		beforeEach('create agent', function () {
			agent = supertest.agent(app);
		});

		beforeEach('make an order', function (done){
			return user.createOrder({
				session_type: 'user',
				order_status: 'in_progress'
			})
		});

		it('checks that an order can be created', function (done) {
			agent
				.post('/api/users/1/orders')
				.send({
					session_type: "user",
					checkout_status: "in_progress"
				})
				.expect(200)
				.end(function(err, res){
		          if (err) return done(err);
		          expect(res.body.session_type).to.equal("user");
		          expect(res.body.checkout_status).to.equal("in_progress");
		          done();
				})			
		});

		it('checks that an order can be deleted', function () {
			agent
				.delete('/api/users/1/orders')
				.send({
					orderId: 1
				})
				.expect(200)
				.end(function(err, res){
		          if (err) return done(err);
		          user.getOrders()
		          .then(function(orders){
		          	expect(orders.length).to.equal(0);
		          })
				})
				
		});

	});
});

// describe('Users Route', function () {

//     var app, User;

//     beforeEach('Sync DB', function () {
//         return db.sync({ force: true });
//     });

//     beforeEach('Create app', function () {
//         app = require('../../../server/app')(db);
//         User = db.model('user');
//     });

// 	describe('Unauthenticated request', function () {

// 		var guestAgent;

// 		beforeEach('Create guest agent', function () {
// 			guestAgent = supertest.agent(app);
// 		});

// 		it('should get a 401 response', function (done) {
// 			guestAgent.get('/api/users/secret-stash')
// 				.expect(401)
// 				.end(done);
// 		});

// 	});

// 	describe('Authenticated request', function () {

// 		var loggedInAgent;

// 		var userInfo = {
// 			email: 'joe@gmail.com',
// 			password: 'shoopdawoop'
// 		};

// 		beforeEach('Create a user', function (done) {
// 			return User.create(userInfo).then(function (user) {
//                 done();
//             }).catch(done);
// 		});

// 		beforeEach('Create loggedIn user agent and authenticate', function (done) {
// 			loggedInAgent = supertest.agent(app);
// 			loggedInAgent.post('/login').send(userInfo).end(done);
// 		});

// 		it('should get with 200 response and with an array as the body', function (done) {
// 			loggedInAgent.get('/api/users/secret-stash').expect(200).end(function (err, response) {
// 				if (err) return done(err);
// 				expect(response.body).to.be.an('array');
// 				done();
// 			});
// 		});

// 	});

// });
