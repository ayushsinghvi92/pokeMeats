app.controller("adminCtrl", function($scope, theUser, ProductFactory, $state, allProducts, allUsers, userFactory){
	console.log("in")
	$scope.isAdmin = theUser.isAdmin;
	if (theUser.isAdmin) {
		$scope.products = allProducts;
		$scope.users = allUsers;
	}
	else {
		$scope.mssg = "You are not an admin!"
	}
	$scope.deleteProduct = function (id) {
		ProductFactory.destroyProduct(id)
		.then(function(res){
			$scope.resetProducts();
		})
	}
	$scope.deleteUser = function (id) {
		userFactory.destroyUser(id)
		.then(function(res){
			$scope.resetUsers();
		})
	}
	$scope.resetProducts = function () {
		ProductFactory.fetchAll()
		.then(function(theProducts){
			$scope.products = theProducts;
		})
	}
	$scope.resetUsers = function () {
		userFactory.fetchAll()
		.then(function(theUsers){
			console.log(theUsers)
			$scope.users = theUsers;
		})
	}
})