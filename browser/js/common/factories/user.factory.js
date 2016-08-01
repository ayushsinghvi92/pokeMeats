app.factory('userFactory', function (AuthService, $http, orderFactory) {

	let getData = (res => res.data);
	return {
		getActiveOrderId : function () {
			return AuthService.getLoggedInUser()
			.then(user=>user.id)
			.then(userId => $http.get('/api/users/' + userId + '/orders/'))
			.then(getData)
			.then(function (orders) {
				return orders.filter(function (order) {
					return order.checkout_status === 'in_progress';
				})
			})
			.then(orders => orders[0].id)
		},
		getActiveOrder : function () {
			return this.getActiveOrderId()
			.then(orderFactory.getAllOrderProducts)
		},
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
        });
        return Promise.all(userOrderProducts)
      })
      .then(function(userOrderProducts){
        completeOrders.forEach((userOrder, index) => {
          userOrder.userOrderProducts = userOrderProducts[index];
        });
        return completeOrders;
      });
    }
	}

})
