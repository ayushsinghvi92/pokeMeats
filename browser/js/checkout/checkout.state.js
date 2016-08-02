app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.template.html',
        controller: 'checkoutCtrl',
        resolve: {
            User : function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});
