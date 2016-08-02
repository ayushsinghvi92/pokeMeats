app.controller("addProductCtrl", function($scope, currUser, ProductFactory, $log, $state){
    $scope.isAdmin = currUser.isAdmin;
    if ($scope.isAdmin) {
        $scope.product = {}
        $scope.createNew = function() {
            ProductFactory.createProduct($scope.product)
            .then(function(res){
                $state.go("admin")
            })
            .catch($log.error)
        }

    } else {
        $scope.mssg = "You are not an admin!"
    }
})