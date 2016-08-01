app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/:tag',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl',
        resolve: {
        	allProducts: function(ProductFactory) {
        		return ProductFactory.fetchAll();
        	}
        }
    });
});