app.controller('CartController', function ($scope, orderFactory) {

    // Images of beautiful Fullstack people.

    orderFactory.getAllOrderProducts(1) //don't forget to chagne this
    .then(function (orderProducts){
      $scope.orderProducts = orderProducts;
    })
    $scope.deleteOrderProduct = orderFactory.deleteOrderProduct;
});
