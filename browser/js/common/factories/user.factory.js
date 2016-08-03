app.factory('userFactory', function (AuthService, $q, $http, orderFactory) {

	let getData = (res => res.data);
	return {
		// can be logically optimized
		getActiveOrderId : function () {
			if(!AuthService.isAuthenticated()) return $q.when(undefined);
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
				else return $q.when(undefined)
			} else {
	     		return this.getActiveOrderId()
				.then(orderFactory.getAllOrderProducts)
			}
		},
		fetchAll: function(){
			return $http.get("/api/users")
			.then(getData)
		},
		fetchById: function (id) {
			return $http.get("/api/users/" + id)
			.then(getData);
		},
		destroyUser: function(id){
			return $http.delete("/api/users/" + id)
			.then(getData)
		},
		updateUser: function(id, updateObj){
			return $http.put("/api/users/" + id, updateObj)
			.then(getData)
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
