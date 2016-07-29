var db = require ('../_db');
var sequelize = require ('sequelize');
var Order = require('./orders');


module.exports = db.define('order_products', {
    unit_price: {
        type: sequelize.INTEGER, //PRICE IN CENTS
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false

    }
}, {
    getterMethods: {
        line_item_total: function () {
            return (this.unit_price * this.quantity)/100;
        }
    },
    hooks : {
        afterCreate : function(order_products){
            var holderVar;
            order_products.getOrder()
            .then(function(theChosenOrder){
                holderVar = theChosenOrder;
                return theChosenOrder.total_order_price();
            })
            .then(function(totalPrice){
                holderVar.total_amount = totalPrice;
                holderVar.save();
            })

        }
    }
});
