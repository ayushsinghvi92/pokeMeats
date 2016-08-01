app.config(function ($stateProvider) {

    $stateProvider.state('editProduct', {
        url: '/editProduct/:id',
        templateUrl: '/js/admin/editProduct/editProduct.template.html',
        controller: "editProductCtrl",
        resolve: {
        	currUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
        	theProduct: function(ProductFactory, $stateParams) {
        		return ProductFactory.fetchById($stateParams.id);
        	}
        }

    });

});

