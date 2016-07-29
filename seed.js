'use strict';
/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

const chalk = require('chalk');
const db = require('./server/db');
const Product = db.model('product');
const pokemon = require('./pokeSeed.json')
const users = require("./userSeed.json")
const Promise = require('sequelize').Promise;
const User = db.model('user');
const Address = db.model('address')
const Order = db.model('orders')


var seedProducts = function () {

    var createdProducts = pokemon.map(function (productObj) {
        return Product.create(productObj);
    });

    return Promise.all(createdProducts);
}

var seedUsers = function () {

    var creatingUsers = users.map(function (userObj) {
         let _user, _address;
         return User.create(userObj, {
            include: [Order, Address]
         })
         .then(function(user){
            _user = user;
            return Address.findOne({
                where: {
                    userId: _user.id
                }
            })
         })
         .then(function(address){
            _address = address;
            return _user.addShippingAddress(_address)
         })
         .then(function(address){
            return _user.addBillingAddress(_address)
         })

    });

    return Promise.all(creatingUsers);
};

const seedOrderProducts = function(){
    let _order;
    return Order.findById(1)
    .then(function(order){
        _order = order;
        return _order.addProduct(1, {
            unit_price: 11,
            quantity: 1
        });
    })
    .then(function(){
        return _order.addProduct(2, {
            unit_price: 22,
            quantity: 2
        });
    });
}

db.sync({ force: true })
    .then(function () {
        return seedProducts();
    })
    .then(function (){
        return seedUsers();
    })
    .then(function(result){
        return seedOrderProducts();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
