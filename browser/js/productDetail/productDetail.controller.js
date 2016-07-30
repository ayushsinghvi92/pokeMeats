app.controller('productDetailCtrl', function($scope, theProduct, orderFactory){
  $scope.product = theProduct;

  orderFactory.getAllOrderProducts(1) //don't forget to chagne this
    .then(function (orderProducts){
      $scope.currentCart = orderProducts;
    })

  orderFactory.getAllOrderProducts(1)
  .then(function(allOrders){
    $scope.totalOrder = allOrders;
  })
})
