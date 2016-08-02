app.controller('CartController', function (theUser, $state, orderFactory, AuthService, $scope, userFactory) {

    $scope.user = theUser;

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
