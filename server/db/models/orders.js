var db = require ('../_db');
var sequelize = require ('sequelize');
var OrderProducts = require('./order_products')

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
    },
    total_amount : {
        type: sequelize.DECIMAL
    }
}, {
    instanceMethods : {
        total_order_price : function(){
            return OrderProducts.findAll({
                where : {
                    orderId : this.id
                }
            })
            .then(function(thisOrderProducts){

                return thisOrderProducts.reduce(function (total, curr) {
                    return total + curr.line_item_total;
                }, 0);
            })
        },
        add_item_to_existing : function(productToAdd, quantity){
            return this.addProduct(productToAdd.id, {
             unit_price : productToAdd.price,
             quantity : quantity })
            .then(function(res){
                return OrderProducts.findAll({
                    where : {
                        productId : productToAdd.id
                    }
                })

            })
            // .catch(console.error.bind(console))
        }
    },
    hooks: {
        beforeCreate: function (order) {
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
            if(order.checkout_status === 'complete'){
             order.order_date = sequelize.fn('NOW');
            }
        }
    }
});
