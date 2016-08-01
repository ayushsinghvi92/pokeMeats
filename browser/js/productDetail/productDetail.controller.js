app.controller('productDetailCtrl', function($scope, userFactory, theProduct, orderFactory, $log){
  $scope.product = theProduct;

  $scope.addToCart = orderFactory.addNewOrderProduct;
  
  $scope.totalCost = 0;
  
  userFactory.getActiveOrder()
  .then(function (orderProducts) {
    $scope.currentCart = orderProducts;
    orderProducts.forEach(function(prod){
      prod.subtotal = prod.unit_price * prod.quantity;
      $scope.totalCost += prod.subtotal;
    })
  })
  .catch($log.error)

  userFactory.getActiveOrderId()
  .then(function(id){
    $scope.orderId = id;
  })
  .catch($log.error)

})
