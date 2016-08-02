app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/js/admin/admin.template.html',
        controller: "adminCtrl",
        resolve: {
            theUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
            },
            allUsers: function(userFactory){
                return userFactory.fetchAll();
            } //yayy!! resolve block

        }
    });

});

