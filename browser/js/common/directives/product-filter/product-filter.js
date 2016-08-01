app.directive('productfilter', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/product-filter/pokemonTypes.html',
        scope: {
        	toggleFilter: "&",
   			clearFilters: "&",
   			
        }

    };

});
