'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Products = require('./models/products')
var Orders = require('./models/orders')
var OrderProducts = require('./models/order_products')

User.belongsToMany(Orders, {through: 'user_orders'});
Orders.belongsTo(User, {through: 'user_orders'});
Orders.belongsToMany(Products, {through: OrderProducts});
Products.belongsToMany(Orders, {through: OrderProducts});
