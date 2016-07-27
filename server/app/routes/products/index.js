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
