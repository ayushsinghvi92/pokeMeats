'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Products = require('./models/products')
var Orders = require('./models/orders')
var OrderProducts = require('./models/order_products')

User.hasMany(Orders);
Orders.belongsTo(User);
Orders.belongsToMany(Products, {through: OrderProducts});
Products.belongsToMany(Orders, {through: OrderProducts});
Orders.hasMany(OrderProducts);
OrderProducts.belongsTo(Orders);
