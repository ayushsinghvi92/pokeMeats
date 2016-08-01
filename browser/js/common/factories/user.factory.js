app.factory('UserFactory', function($http, orderFactory){

  let getData = function(result){
    return result.data;
  }

  return {
    fetchAllUserAddresses: function(userId){
      return $http.get('/api/users/'+ userId +'/addresses')
      .then(getData);
    },
    fetchAllUserOrders: function(userId){
      let completeOrders;
      return $http.get('api/users/' + userId + '/orders')
      .then(getData)
      .then(userOrders => {
        completeOrders = userOrders;
        let userOrderProducts = userOrders.map(function(userOrder){
          return orderFactory.getAllOrderProducts(userOrder.id)
        })
        return Promise.all(userOrderProducts)
      })
      .then(function(userOrderProducts){
        completeOrders.forEach((userOrder, index) => {
          userOrder.userOrderProducts = userOrderProducts[index];
        })
        return completeOrders;
      })
    }
  }

});
