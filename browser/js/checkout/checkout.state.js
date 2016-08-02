app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout/:id',
        templateUrl: 'js/checkout/checkout.template.html',
        controller: 'checkoutCtrl',
        resolve: {

        }
    });
});
