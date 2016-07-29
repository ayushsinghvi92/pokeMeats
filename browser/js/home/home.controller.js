app.controller("homeCtrl", function($scope, allProducts){
	console.log(allProducts);
	$scope.pokemon = allProducts;
	
})