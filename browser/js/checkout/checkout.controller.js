app.controller('checkoutCtrl', function($scope, userFactory, $log, User){

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

  userFactory.fetchAllUserAddresses(User.id)
  .then(function(res){
    $scope.addresses = res;
  })
})
