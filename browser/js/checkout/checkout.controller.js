app.controller('checkoutCtrl', function($scope, userFactory, $log, User, orderFactory, $state){
  console.log(orderFactory);
  $scope.totalCost = 0;

  userFactory.getActiveOrder()
  .then(function (orderProducts) {
    $scope.currentCart = orderProducts;
    if (orderProducts.length) {
      $scope.currentOrderId = orderProducts[0].orderId;
    }
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

  $scope.complete = function(){
    return orderFactory.completeOrder($scope.currentOrderId, {checkout_status: "complete"})
    .then(function(){
      $state.go("myAccount")
    })
  }
})
