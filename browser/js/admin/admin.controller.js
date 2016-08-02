app.controller("adminCtrl", function($scope, theUser, ProductFactory, $state, allProducts, allUsers, userFactory, $log){
	$scope.isAdmin = theUser.isAdmin;
	if (theUser.isAdmin) {
		$scope.products = allProducts.sort(function(a,b){
			return a.id - b.id;		
		});
		$scope.users = allUsers.sort(function(a,b){
			return a.id - b.id;
		});
	}
	else {
		$scope.mssg = "You are not an admin!"
	}
	$scope.deleteProduct = function (id) {
		ProductFactory.destroyProduct(id)
		.then(function(res){
			resetProducts();
		})
		.catch($log.error)
	}
	$scope.deleteUser = function (id) {
		userFactory.destroyUser(id)
		.then(function(res){
			resetUsers();
		})
		.catch($log.error)
	}
	function resetProducts () {
		ProductFactory.fetchAll()
		.then(function(theProducts){
			$scope.products = theProducts;
		})
		.catch($log.error)
	}
	function resetUsers () {
		userFactory.fetchAll()
		.then(function(theUsers){
			$scope.users = theUsers;
		})
		.catch($log.error)
	}
})