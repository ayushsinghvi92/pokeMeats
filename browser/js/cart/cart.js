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
    	$scope.orderProducts = orderProducts;
    })

    console.log('updated quantity is ', $scope.updatedQuantity)
    $scope.updateQuantity = orderFactory.updateQuantity;

    $scope.deleteOrderProduct = orderFactory.deleteOrderProduct;

});

app.factory('orderFactory', function ($http) {

	function getData (res) {
		return res.data;
	};

  function appendDetails(orderProduct){
    return $http.get('/api/products/' + orderProduct.productId)
    .then(getData)
    .then(function(product){
      orderProduct.name = product.name;
      orderProduct.description = product.description;
      orderProduct.photo = product.photo;
      orderProduct.id = product.id;
      return orderProduct;
    })
  }

	return {
		updateQuantity: function (orderId, product, quantity) {
			return $http.put('/api/orders/'+ orderId, {
				product:product,
				quantity:quantity
			})
			.then(getData)
		},
		getAllOrderProducts: function (orderId) {
			return $http.get('/api/orders/' + orderId)
			.then(getData)
			.then(order => {
        return order.order_products})
      .then(function(orderProducts){
        return Promise.all(orderProducts.map(appendDetails))
      })

		},
		deleteOrderProduct: function (orderId, product) {
      console.log('deleteorderProduct factory function called');
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
