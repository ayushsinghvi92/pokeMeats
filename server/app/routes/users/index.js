'use strict';
let router = require('express').Router();
const db = require('../../../db')
const Users = db.model('user');
module.exports = router;
var _ = require('lodash');


router.param('id', function (req, res, next, id) {
  var _id = id;
  Users.findById(_id)
  .then(function (user) {
    if (!user) throw HttpError(404);
    else req.user = user;
    next();
  })
  .catch(next);
});

router.get('/', function(req, res, next) {
    Users.findAll()
    .then(function(users){
        res.json(users);
    })
    .catch(next);
})

router.get('/:id', function(req, res, next) {
    res.json(req.user);
})

router.get('/:id/orders', function(req, res, next) {
    req.user.getOrders()
    .then(function(orders){
        res.json(orders);
    })
    .catch(next);
})

// THIS ROUTE IS INCOMPLETE
router.post("/:id/orders", function(req, res, next){
    req.user.createOrder(req.body)
    .then(function(order){
        res.json(order)
    })
    .catch(next);
})

router.get('/:id/orders/:orderID', function(req, res, next) {
    req.user.getOrders({
        where: {
            id: req.params.orderID
        }
    })
    .spread(function(order){
        res.json(order);
    })
    .catch(next);
})


// THIS ROUTE IS INCOMPLETE
router.put('/:id/orders/:orderID', function(req, res, next) {
    req.user.getOrders({
        where: {
            id: req.params.orderID
        }
    })
    .spread(function(order){
        console.log(req.body);
        res.send("put request for a user's single order")
    })
    .catch(next);
})


var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/secret-stash', ensureAuthenticated, function (req, res) {

    var theStash = [
        'http://ep.yimg.com/ay/candy-crate/bulk-candy-store-2.gif',
        'http://www.dailybunny.com/.a/6a00d8341bfd0953ef0148c793026c970c-pi',
        'http://images.boomsbeat.com/data/images/full/44019/puppy-wink_1-jpg.jpg',
        'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
        'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
        'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
        'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
        'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg',
        'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
        'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
        'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg'
    ];

    res.send(_.shuffle(theStash));

});
