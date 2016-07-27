const router = require('express').Router();
const db = require('../../../db');
const Order = db.model('orders');


router.param('id', function (req, res, next, id) {
  var _id = id;
  Order.findById(_id)
  .then(function (order) {
    if (!order) throw httpError(404);
    else {
	    req.order = order;
    }
	next();
  })
  .catch(next);
});

function verifyUser (userId, order) {
	if(order.userId === userId || order.session_type === 'guest')
		return true;
	else return false;
}

router.post('/:id', function (req, res, next) {
	let userId = null;
	if (req.user) {
		userId = req.user.id;
	}
	if(verifyUser(userId, req.order)) {
		let item = req.order.add_item_to_existing(req.body.product, req.body.quantity)
		console.log('this is the item\n\n', item)
		res.send(item)
	}
	else
		res.sendStatus(403)

})

module.exports = router;	   