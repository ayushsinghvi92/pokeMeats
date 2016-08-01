app.controller('MyAccountController', function ($scope, UserFactory, AuthService, orderFactory) {
    AuthService.getLoggedInUser().then(function (user) {
      console.log($scope.user, 'scopeuserrrr');
        $scope.user = user;
    });

    UserFactory.fetchAllUserAddresses(5) //don't forget to change this
    .then(function(userAddresses){
      $scope.userAddresses = userAddresses;
    })

    UserFactory.fetchAllUserOrders(5) // don't forget to change this - only orderId 1 has order Products, and orderId 1 belongs to userId 5
    .then(function(userOrders){
      $scope.userOrders = userOrders;
      $scope.userOrderProducts = userOrders.order_products;
      //this is almost working - figure out why order_products isn't iterable.
    })

    $scope.addressCount = 0
});

