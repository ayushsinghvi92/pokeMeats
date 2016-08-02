app.controller('CartController', function ($state, orderFactory, AuthService, $scope, userFactory) {

    let redirect = function () {
        $state.go($state.current, {}, {reload:true})
    }

    userFactory.getActiveOrder()
    .then(function (orderProducts){
      $scope.orderProducts = orderProducts;
    })

    userFactory.getActiveOrderId().then(res => $scope.orderId = res);

    $scope.updateQuantity = function(product, quantity){
        return orderFactory.updateQuantity($scope.orderId, product, quantity);
    }

    $scope.deleteOrderProduct = function (orderProduct) {
    	return orderFactory.deleteOrderProduct($scope.orderId, orderProduct)
    	.then(redirect)
    }
});
