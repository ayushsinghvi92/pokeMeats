'use strict';

const Sequelize = require('sequelize');
const db = require('../_db');

// OB/MS: consider more validations
module.exports = db.define('address', {
	line1: {
		type: Sequelize.STRING,
		allowNull: false
	},
	line2: {
		type: Sequelize.STRING
	},
	city: {
		type: Sequelize.STRING,
		allowNull: false
	},
	state_region: {
		type: Sequelize.STRING,
		allowNull: false
	},
	country: {
		type: Sequelize.STRING,
		allowNull: false
	},
	zipcode: {
		type:Sequelize.INTEGER, // OB/MS: watch out for leading zeros (my hometown!)
		allowNull:false
	}
})