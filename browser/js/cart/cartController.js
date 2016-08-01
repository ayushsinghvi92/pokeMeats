app.controller('CartController', function ($state, orderFactory, AuthService, $scope, userFactory) {

    userFactory.getActiveOrder()    
    .then(function (orderProducts){
      $scope.orderProducts = orderProducts;
    })

    $scope.deleteOrderProduct = function (orderId, orderProduct) {
    	return orderFactory.deleteOrderProduct(orderId, orderProduct)
    	.then(function () {
    		$state.go($state.current, {}, {reload:true})
    	})
    }
});
