app.controller('MyAccountController', function ($scope, UserFactory, AuthService, orderFactory) {
    AuthService.getLoggedInUser().then(function (user) {
      console.log($scope.user, 'scopeuserrrr');
        $scope.user = user;
    });


    UserFactory.fetchAllUserAddresses(1) //don't forget to chagne this
    .then(function(userAddresses){
      $scope.userAddresses = userAddresses;
    })

    UserFactory.fetchAllUserOrders(1)
    .then(function(userOrders){
      $scope.userOrders = userOrders;
      //NEED TO THINK ABOUT HOW TO GET ALL ORDERPRODUCTS FOR THE RETURNED ARRAY OF ORDERS. PROMISE.ALL
    })

    $scope.addressCount = 0
});

