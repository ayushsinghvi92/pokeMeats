app.controller('MyAccountController', function ($scope, UserFactory, AuthService, orderFactory) {
    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });

    UserFactory.fetchAllUserAddresses(5) //don't forget to change this
    .then(function(userAddresses){
      $scope.userAddresses = userAddresses;
    })

    UserFactory.fetchAllUserOrders(5) // don't forget to change this - only orderId 1 has order Products, and orderId 1 belongs to userId 5
    .then(function(userOrders){
      $scope.userOrders = userOrders;
      //this is almost working - need to figure out how to best get to Product details
    })

    $scope.addressCount = 0
});

