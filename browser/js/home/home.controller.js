app.controller("homeCtrl", function($scope, ProductFactory, $stateParams){
	

	ProductFactory.fetchAll()
	.then(function (pokemon) {
		$scope.pokemon = pokemon;
	})

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

