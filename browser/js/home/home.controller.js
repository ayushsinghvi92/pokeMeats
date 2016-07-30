app.controller("homeCtrl", function($scope, ProductFactory, $stateParams){


	ProductFactory.fetchAll()
	.then(function (pokemon) {
		$scope.pokemon = pokemon;
	})

	// if ($stateParams.tag.length) {
	// 	$scope.pokemon = $scope.pokemon.filter(function(pokemon){
	// 		return pokemon.tags.includes($stateParams.tag)
	// 	})
	// }

	$scope.filters = [];
	$scope.isSelected = false;
	$scope.toggleFilter = function (type, event) {
		console.log(event)
		$scope.isSelected = !$scope.isSelected;
		$scope.filters.push(type);

		$scope.pokemon = allProducts.filter(function(pokemon){
			return $scope.filters.includes(pokemon.type);
		})
	}

	$scope.clearFilters = function () {
		$scope.pokemon = allProducts;
		$scope.filters = [];
	}
});

