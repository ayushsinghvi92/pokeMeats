'use strict';
const db = require('./_db');
module.exports = db;

const User = require('./models/user');
const Products = require('./models/products')
const Orders = require('./models/orders')
const OrderProducts = require('./models/order_products')
const Address = require('./models/address')

User.hasMany(Orders);
Orders.belongsTo(User);
Orders.belongsToMany(Products, {through: OrderProducts});
Products.belongsToMany(Orders, {through: OrderProducts});

// Address.belongsTo(User, {as: 'shippingAddress'});
// Address.belongsTo(User, {as: 'billingAddress'});


User.hasMany(Address, {as: 'shippingAddress'});
User.hasMany(Address, {as: 'billingAddress'});