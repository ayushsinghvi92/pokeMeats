var db = require ('../_db');
var sequelize = require ('sequelize');
var Order = require('./orders');

module.exports = db.define('order_products', {
    unit_price: {
        type: sequelize.DECIMAL, // OB/MS: use INTEGER and keep values in cents to avoid floating point woes
        allowNull: false
        // OB/MS: consider min validation
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
        // OB/MS: consider min validation, consider default 1
    }
}, {
    getterMethods: {
        line_item_total: function () { // OB/MS: snake case?
            return this.unit_price * this.quantity;
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
                holderVar.save(); // OB/MS: recommend against this approach, use method on order instead
            })

        }
    }
});
