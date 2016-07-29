app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });
 
});

app.controller('CartController', function ($scope, orderFactory) {

    // Images of beautiful Fullstack people.

    orderFactory.getAllOrderProducts(1) //don't forget to chagne this
    .then(function (orderProducts){
    	$scope.products = orderProducts;
    })
    $scope.updateQuantity = orderFactory.updateQuantity;

});

app.factory('orderFactory', function ($http) {

	function getData (res) {
		return res.data;
	};
	
	return {
		updateQuantity: function (orderId, product, quantity) {
			return $http.put('/api/orders/'+ orderId, {
				product:product,
				quantity:quantity
			})
			.then(getData)
		},
		getAllOrderProducts: function  (orderId) {
			return $http.get('/api/orders/' + orderId)
			.then(getData)
			.then(order => order.order_products)
		},
		deleteOrderProduct: function (orderId, product) {
			return $http.delete('/api/orders/'+orderId, product)
			.then(getData)
		},
		addNewOrderProduct: function (orderId, product, quantity = 1) {
			return $http.post('/api/orders/'+orderId, {
				product:product,
				quantity:quantity
			})
		}
	}

})