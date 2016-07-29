app.config(function ($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/products/:id',
        templateUrl: 'js/productDetail/productDetail.html',
        controller: 'productDetailCtrl',
        resolve: {
        	theProduct: function(ProductFactory, $stateParams) {
        		return ProductFactory.fetchById($stateParams.id);
        	}
        }
    });
});
