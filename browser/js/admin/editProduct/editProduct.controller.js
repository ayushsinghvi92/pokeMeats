app.controller("editProductCtrl", function($scope, theProduct, ProductFactory, $state, currUser){
	$scope.isAdmin = currUser.isAdmin;
	if ($scope.isAdmin) {
		$scope.product = theProduct;
		$scope.update = function () {
			return ProductFactory.updateProduct(theProduct.id, $scope.product)
			.then(function(product){
				$state.go('admin')
			})

		}
	} else {
		$scope.mssg = "You are not an admin!"
	}

})