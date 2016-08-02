app.config(function ($stateProvider) {
    $stateProvider.state('addProduct', {
        url: '/addProduct/',
        templateUrl: '/js/admin/AddProduct/addProduct.template.html',
        controller: "addProductCtrl",
        resolve: {
        	currUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }

    });

});

