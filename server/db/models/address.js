'use strict';

const Sequelize = require('sequelize');
const db = require('../_db');

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
		type:Sequelize.INTEGER,
		allowNull:false
	}
})