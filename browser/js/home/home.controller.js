app.controller("homeCtrl", function($scope, ProductFactory, $stateParams, allProducts){


	$scope.pokemon = allProducts;
	$scope.filters = [];
	$scope.isSelected = false;
	$scope.toggleFilter = function (type) {
		let ind = $scope.filters.indexOf(type);
		if (ind == -1) {
			$scope.filters.push(type);
		}
		else {
			$scope.filters.splice(ind, 1)
		}
		if ($scope.filters.length) {
			$scope.pokemon = allProducts.filter(function(pokemon){
				return $scope.filters.includes(pokemon.type);
			})
		}
		else {
			$scope.pokemon = allProducts;
		}


	}

	$scope.clearFilters = function () {
		$scope.pokemon = allProducts;
		$scope.filters = [];
	}
});

