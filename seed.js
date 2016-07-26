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

var chalk = require('chalk');
var db = require('./server/db');

var Product = db.model('product');
var pokemon = require('./pokeSeed')
var Promise = require('sequelize').Promise;


var User = db.model('user');
var Promise = require('sequelize').Promise;

var seedProducts = function () {

    var createdProducts = pokemon.map(function (productObj) {
        return Product.create(productObj);
    });

    return Promise.all(createdProducts);
}

var seedUsers = function () {

    var users = [
        {
            first_name: 'First',
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            first_name: 'Barack',
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);
};

var seedOrder = function (){
    return User.findById(1)
    .then(function(user){
        return user.createOrder({
            session_type: 'user',
            checkout_status: 'in_progress'
        });
    })
}

db.sync({ force: true })
    .then(function () {
        return seedProducts();
    })
    .then(function (){
        return seedUsers();
    })
    .then(function(){
        return seedOrder();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
