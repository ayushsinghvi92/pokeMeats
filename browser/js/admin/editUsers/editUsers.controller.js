app.controller("editUserCtrl", function($scope, theUser, $state, userFactory, currUser){
	$scope.isAdmin = currUser.isAdmin;

	if($scope.isAdmin) {
		$scope.user = theUser;
		$scope.update = function() {
			if ($scope.adminVal == "Admin") {
				$scope.user.isAdmin = true;
			} else if ($scope.adminVal == "User") {
				$scope.user.isAdmin = false;
			}
			userFactory.updateUser($scope.user.id, $scope.user)
			.then(function(res){
				$state.go("admin")
			})
		}
	} else {
		$scope.mssg = "You are not an admin!"
	}


})