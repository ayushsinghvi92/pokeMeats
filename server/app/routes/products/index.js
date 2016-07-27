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
	if (isNaN(req.params.id)) res.status(500);
	Products.findById(req.params.id)
	.then(function(product){
		if (!product) {
			res.status(404)
		}
		res.json(product);
	})
	.catch(next);

}) 