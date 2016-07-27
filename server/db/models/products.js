var db = require ('../_db');
var sequelize = require ('sequelize');

// OB/MS: consider more validations!
var Product = db.define('product', {
	name: sequelize.STRING,
	type: sequelize.STRING,
	price: sequelize.FLOAT, // OB/MS: again, go for INTEGER and cents
	description: sequelize.TEXT,
	photo: sequelize.STRING, // OB/MS: url validation
	inventoryAmount: sequelize.INTEGER,
	tags: sequelize.ARRAY(sequelize.STRING)
})

module.exports = Product;