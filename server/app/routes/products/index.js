'use strict';
let router = require('express').Router();
const db = require('../../../db');
const Products = db.model('product')
module.exports = router;

router.get('/', function (req, res, next){
	Products.findAll()
	.then(function(products){
		res.json(products)
	})
	.catch(next);
})

router.get('/:id', function(req, res, next){
	if (isNaN(req.params.id)) res.sendStatus(500);
	else {
		Products.findById(req.params.id)
		.then(function(product){
			if (!product) {
				res.sendStatus(404)
			} else {
				res.json(product);
			}
		})
		.catch(next);
	}

})

router.put('/:id', function(req, res, next){
	Products.findById(req.params.id) 
	.then(function(product){
		return product.update(req.body)
	})
	.then(function(updatedProduct){
		res.json(updatedProduct);
	})
	.catch(next)

})

router.put('/:id', function(req, res, next){
    req.user.update(req.body)
    .then(function(user){
        res.json(user);
    })
    .catch(next);

})

router.post('/', function(req, res, next){
	console.log(req.body)
	Products.create(req.body)
	.then(function(response){
		res.sendStatus(204);
	})
	.catch(next);
})

router.delete('/:id', function(req, res, next){
	if (isNaN(req.params.id)) res.sendStatus(500);
	else {
		Products.findById(req.params.id)
		.then(function(product){
			if (!product) {
				res.sendStatus(404)
			} else {
				product.destroy();
				res.json(product)
			}
		})
		.catch(next);
	}

})