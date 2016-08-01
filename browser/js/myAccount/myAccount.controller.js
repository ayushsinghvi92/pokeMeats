app.controller('MyAccountController', function ($scope, userFactory, AuthService, orderFactory, $state, user) {

    var redirectAfterFunc = function () {
        return $state.go($state.current, {}, {reload:true})
      };

    $scope.user = user;
    $scope.showForm = false;

    userFactory.fetchAllUserAddresses($scope.user.id)
    .then(function(userAddresses){
      console.log('user is', $scope.user)
      $scope.userAddresses = userAddresses;
    })

    userFactory.fetchAllUserOrders($scope.user.id)
    .then(function(userOrders){
      $scope.userOrders = userOrders;
    })

    $scope.createAddress = function(form){
      return userFactory.createUserAddress($scope.user.id, form)
      .then(redirectAfterFunc);
    }

    $scope.updateAddress = function(form, addressId){
      return userFactory.updateUserAddress($scope.user.id, form, addressId)
      .then(redirectAfterFunc);
    }

    $scope.deleteAddress = function(addressId){
      return userFactory.deleteUserAddress($scope.user.id, addressId)
      .then(redirectAfterFunc);
    }

    $scope.toggleShowForm = function(){
      $scope.showForm = !$scope.showForm;
    }
});

