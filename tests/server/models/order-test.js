const sinon = require('sinon');
const expect = require('chai').expect;
const Sequelize = require('sequelize');
const db = require('../../../server/db');

const User = db.model('user');
const Orders = db.model('orders');
const OrderProducts = db.model('order_products');
const Product = db.model('product');

let testProduct;
// Product.findById(1).
//  then(product => {
//   testProduct = product
// })



function createUser () {
 return User.create({
   first_name: 'Test User',
   email: 'test@fsa.com',
   password: 'password'
 });
}

const goodInitialOrder  = {
 session_type: 'user',
 checkout_status: 'in_progress'
}

const badInitialOrderWithNoAddressIds  = {
 session_type: 'user',
 checkout_status: 'complete'
}

const badInitialOrderWithNullAddressIds  = {
 session_type: 'user',
 checkout_status: 'complete',
 billing_address_id: null,
}

beforeEach('Sync DB', function () {
 return db.sync({force:true})
});

describe("Orders Model", function () {
 describe('beforeCreate Hooks', function () {
   it('allows you to create an in-progress order', function (done) {
         createUser()
         .then(user => user.createOrder(goodInitialOrder))
         .then(order => {
           expect(order.checkout_status).to.equal('in_progress');
           done();
         })
         .catch(done)
   });
   it('errors when you to create a new order as complete with no addresses', function (done) {
         createUser()
         .then(user => user.createOrder(badInitialOrderWithNoAddressIds))
         .then(order => {
           expect(order.checkout_status).to.equal('complete');
           done();
         })
         .catch(function(error){
           expect(error).to.equal('You can\'t do that!')
           done();
         })
   });
   it('errors when you to create a new order as complete with null addresses', function (done) {
         createUser()
         .then(user => user.createOrder(badInitialOrderWithNullAddressIds))
         .then(order => {
           expect(order.checkout_status).to.equal('complete');
           done();
         })
         .catch(error => {
           expect(error).to.equal('You can\'t do that!')
           done();
         })
   });
   it('allows you to update an existing order as complete with addresses AND order_date is good', function (done) {
         createUser()
         .then(user => user.createOrder(goodInitialOrder))
         .then(order => {
           order.checkout_status = 'complete';
           order.billing_address_id = 123;
           order.shipping_address_id = 123;
           return order.save();
         })
         .then(order => {
           expect(order.checkout_status).to.equal('complete')
           done();
         })
         .catch(error => {
           expect(error).to.equal('You can\'t do that!')
           done();
         })
   });
   it('errors when you to update an existing order as complete with no addresses', function (done) {
         createUser()
         .then(user => user.createOrder(goodInitialOrder))
         .then(order => {
           order.checkout_status = 'complete';
           return order.save();
         })
         .then(order => {
           expect(order.checkout_status).to.equal('complete')
           done()
         })
         .catch(error => {
           expect(error).to.equal('You can\'t do that!')
           done();
         })
   });

 })
 describe('instanceMethods', function () {
  it('allows you to add a product to an existing order', function (done) {

        Product.create({
          "name":"Bulbasaur Liver","type":"grass","price":33.33,"description":"hello","photo":"/img/001 Bulbasaur.ico","inventoryAmount":10
          })
          .then(product => {testProduct = product; return testProduct})
          .then(function(){
            return createUser()
          })
         .then(user => user.createOrder(goodInitialOrder))
         .then(order => {
            return order.add_item_to_existing(testProduct, 2);
         })
         .then(res => {
          expect(res[0].quantity).to.equal(2);
          done();
          })
         .catch(done)
   });
 })
});//nothing here yet
