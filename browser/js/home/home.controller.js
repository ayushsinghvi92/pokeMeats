app.controller("homeCtrl", function($scope, allProducts, $stateParams){
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
		let buttons = $(".typeIcons button"); //no direct dom manipulation 
		buttons.css("background-color", "");
		$scope.toggleOrder("pokeID")
	}

	$scope.toggleOrder = function(filter) {
		$scope.pokemon = $scope.pokemon.sort(function(a,b){ //sort by filter?? also sort mutates(evolves) original. no need for reassignment
			if (filter == "price") {
				return a.price - b.price
			}
			else if (filter == "pokeID") {
				return a.id - b.id;
			}

		})
	}
});

