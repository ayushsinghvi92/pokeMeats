var db = require ('../_db');
var sequelize = require ('sequelize');

module.exports = db.define('orders', {
    session_type: {
        type: sequelize.ENUM('guest', 'user'),
        defaultValue: 'guest'
    },
    checkout_status: {
        type: sequelize.ENUM('in_progress', 'complete'),
        defaultValue: 'in_progress'
    },
    order_date: {
        type: sequelize.DATE
    },
    shipping_address_id: {
        type: sequelize.INTEGER
    },
    billing_address_id: {
        type: sequelize.INTEGER
    }
}, {
    hooks: {
        beforeCreate: function (order) {
            if(order.checkout_status === 'complete' && (order.shipping_address_id === null || order.billing_address_id === null)){
              var err = new Error ('You must supply a shipping or billing address id');
              throw err;
            }
        },
        beforeUpdate: function(order) {
            if(order.checkout_status === 'complete' && (order.shipping_address_id === null || order.billing_address_id === null)){
              var err = new Error ('You must supply a shipping or billing address id');
              throw err;
            }
            if(order.checkout_status === 'complete')
            order.order_date = sequelize.fn('NOW');
        }
    }
});
