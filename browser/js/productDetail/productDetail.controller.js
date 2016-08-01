app.controller('productDetailCtrl', function($scope, userFactory, theProduct, orderFactory){
  $scope.product = theProduct;

  $scope.addToCart = orderFactory.addNewOrderProduct;

  userFactory.getActiveOrder()
  .then(function (orderProducts) {
  	$scope.currentCart = orderProducts;
  })

  userFactory.getActiveOrderId()
  .then(function (orderId) {
  	$scope.orderId = orderId;
  })

  // What does this do? Didn't delete incase I missed something...

  // orderFactory.getAllOrderProducts(1)
  // .then(function(allOrders){
  //   $scope.totalOrder = allOrders;
  // })
})
