app.factory('userFactory', function (AuthService, $q, $http, orderFactory) {

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
			if(!AuthService.isAuthenticated()) {
				let orderProducts = JSON.parse(localStorage.getItem('pokeMeatProducts'));
				if(orderProducts) {
					return $q.when(Array.prototype.slice.apply(orderProducts))
				}
			}
      return this.getActiveOrderId()
			.then(orderFactory.getAllOrderProducts)
		},
    createUserAddress: function(userId, address){
      return $http.post('/api/users/'+ userId + '/addresses', address)
      .then(getData);
    },
    updateUserAddress: function(userId, address, addressId){
      return $http.put('/api/users/'+ userId + '/addresses/' + addressId, address)
      .then(getData);
    },
    deleteUserAddress: function(userId, addressId){
      return $http.delete('/api/users/'+ userId + '/addresses/' + addressId)
      .then(getData);
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
