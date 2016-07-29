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
	if(order.userId === userId || (order.session_type === 'guest' && !order.userId)) {
    return true;
  }
	else return false;
}

router.post('/:id', function (req, res, next) {
	let userId = null;
	if (req.user) {
		userId = req.user.id;
	}
	if(verifyUser(userId, req.order)) {
		let item = req.order.add_item_to_existing(req.body.product, req.body.quantity)
		res.send(item)
	}
	else
		res.sendStatus(403)

})

router.put('/:id', function(req, res, next){
  let userId = null;
  if (req.user) {
    userId = req.user.id;
  }
  if(verifyUser(userId, req.order)) {
    return req.order.getProducts({
      where : {
        id : req.body.product.id
      }
    })
    .spread(function(product){
      return product.update({
        quantity : req.body.quantity
      })
    })
    .then(function(updatedProduct){
      res.send(updatedProduct);
    })
  }else{
    res.sendStatus(403);
  }
})

router.delete('/:id', function(req, res, next){
  let userId = null;
  if (req.user) {
    userId = req.user.id;
  }
  if(verifyUser(userId, req.order)) {
    return req.order.removeProduct(req.body.product.id)
    .then(function(removedItem){
      res.json(removedItem);
    })
  } else{
    res.sendStatus(403);
  }
})


module.exports = router;
