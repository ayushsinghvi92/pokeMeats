'use strict';
const db = require('./_db');
module.exports = db;

const User = require('./models/user');
const Products = require('./models/products')
const Orders = require('./models/orders')
const OrderProducts = require('./models/order_products')
const Address = require('./models/address')

User.hasMany(Orders); // OB/MS: recommend singular style (drop the s)
Orders.belongsTo(User);
Orders.belongsToMany(Products, {through: OrderProducts});
Products.belongsToMany(Orders, {through: OrderProducts});

// Address.belongsTo(User, {as: 'shippingAddress'}); // OB/MS: check out `foreignKey: ...` option
// Address.belongsTo(User, {as: 'billingAddress'});


User.belongsToMany(Address, {as: 'shippingAddresses', through:'shippingAddress'});
User.belongsToMany(Address, {as: 'billingAddresses', through:'billingAddress'});
