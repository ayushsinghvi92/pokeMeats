app.config(function ($stateProvider) { //have you considered child states?
    $stateProvider.state('editUsers', {
        url: '/editUsers/:id',
        templateUrl: '/js/admin/editUsers/editUsers.template.html',
        controller: "editUserCtrl",
        resolve: { //redundant resolve??
        	currUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
        	theUser: function ($stateParams, userFactory) {
        		return userFactory.fetchById($stateParams.id);
        	}
        }

    });

});

