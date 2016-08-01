app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin/:id',
        templateUrl: '/js/admin/admin.template.html',
        controller: "adminCtrl",
        resolve: {
            theUser: function($stateParams, userFactory) {
                return userFactory.fetchById($stateParams.id)
            },
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
            },
            allUsers: function(userFactory){
                return userFactory.fetchAll();
            }

        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

