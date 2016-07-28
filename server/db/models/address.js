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
		type: Sequelize.STRING(32),
		allowNull: false
	},
	state_region: {
		type: Sequelize.STRING(32),
		allowNull: false
	},
	country: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	zipcode: {
		type:Sequelize.STRING(16),
    isNumeric : true,
    allowNull:false
	}
})
