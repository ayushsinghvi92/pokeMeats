
app.controller("homeCtrl", function($scope, allProducts, $stateParams){
	$scope.pokemon = allProducts;


	// if ($stateParams.tag.length) {
	// 	$scope.pokemon = $scope.pokemon.filter(function(pokemon){
	// 		return pokemon.tags.includes($stateParams.tag)
	// 	})
	// }

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
		let buttons = $(".typeIcons button");
		buttons.css("background-color", "");
	}
});

