var db = require ('../_db');
var sequelize = require ('sequelize');

// OB/MS: consider more validations
module.exports = db.define('orders', { // OB/MS: I think standard is singular not plural here
    session_type: {
        type: sequelize.ENUM('guest', 'user'),
        defaultValue: 'guest'
    },
    checkout_status: {
        type: sequelize.ENUM('in_progress', 'complete'), // OB/MS: 'cancelled'?
        defaultValue: 'in_progress'
    },
    order_date: {
        type: sequelize.DATE
    },
    shipping_address_id: { // OB/MS: association instead?
        type: sequelize.INTEGER
    },
    billing_address_id: {
        type: sequelize.INTEGER
    }
}, {
    hooks: {
        beforeCreate: function (order) {
            // OB/MS: this should probably be explicit validations
            //don't allow a new order to be created as completed with either null address ids, or missing those fields
            if(order.checkout_status === 'complete' && (!order.shipping_address_id || !order.billing_address_id)){
              //throw new Error('You must supply a shipping or billing address id');
              return sequelize.Promise.reject('You can\'t do that!');
            }
        },
        beforeUpdate: function(order) {
            //don't allow an order to be updated as completed with either null address ids, or missing those fields
            if(order.checkout_status === 'complete' && (!order.shipping_address_id || !order.billing_address_id)){
              //throw new Error('You must supply a shipping or billing address id');
              return sequelize.Promise.reject('You can\'t do that!');
            }
            // OB/MS: you might roll this logic into a `checkout` instance method later
            if(order.checkout_status === 'complete')
            order.order_date = sequelize.fn('NOW');
        }
    }
});
