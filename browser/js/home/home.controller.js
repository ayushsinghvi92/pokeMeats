app.controller("homeCtrl", function($scope, allProducts, $stateParams){
	$scope.pokemon = allProducts;
	if ($stateParams.tag.length) {
		$scope.pokemon = $scope.pokemon.filter(function(pokemon){
			return pokemon.tags.includes($stateParams.tag)
		})
	}

	$scope.toggleFilter = function (type) {
		$scope.pokemon = allProducts.filter(function(pokemon){
			return pokemon.type == type;
		})
	}

	$scope.clearFilters = function () {
		$scope.pokemon = allProducts;
	}


	
})