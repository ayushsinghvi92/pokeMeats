app.controller('CartController', function (orderFactory, AuthService, $scope, userFactory) {

    userFactory.getActiveOrder()    
    .then(function (orderProducts){
      $scope.orderProducts = orderProducts;
    })
 
    console.log('updated quantity is ', $scope.updatedQuantity)

    $scope.deleteOrderProduct = orderFactory.deleteOrderProduct;

});
