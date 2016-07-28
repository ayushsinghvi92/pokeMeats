var db = require ('../_db');
var sequelize = require ('sequelize');

var Product = db.define('product', {
	name: sequelize.STRING,
	type: sequelize.STRING,
	price: sequelize.INTEGER, //PRICE IN CENTS
	description: sequelize.TEXT,
	photo: sequelize.STRING,
	inventoryAmount: sequelize.INTEGER,
	tags: sequelize.ARRAY(sequelize.STRING)
})

module.exports = Product;