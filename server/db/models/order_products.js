var db = require ('../_db');
var sequelize = require ('sequelize');

module.exports = db.define('order_products', {
    unit_price: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false

    }
}, {
    getterMethods: {
        line_item_total: function () {
            return this.unit_price * this.quantity;
        }
    }
});
