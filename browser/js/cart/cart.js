app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope) {

    // Images of beautiful Fullstack people.
    $scope.products = [{"name":"Bulbasaur Tail","type":"grass","unit_price":33.33,"description":"This is some tasty tail","photo":"http://cdn.bulbagarden.net/upload/thumb/1/19/Ash_Bulbasaur.png/245px-Ash_Bulbasaur.png","inventoryAmount":10,"quantity": 2},{"name":"Ivysaur Tongue","type":"grass","unit_price":100,"description":"This is some tasty tail","photo":"http://cdn.bulbagarden.net/upload/thumb/1/19/Ash_Bulbasaur.png/245px-Ash_Bulbasaur.png","inventoryAmount":10, "quantity":3},{"name":"Venusaur Tongue","type":"grass","unit_price":100,"description":"This is some tasty tail","photo":"http://cdn.bulbagarden.net/upload/thumb/1/19/Ash_Bulbasaur.png/245px-Ash_Bulbasaur.png","inventoryAmount":10, "quantity":3}];

});
