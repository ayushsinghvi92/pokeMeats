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
		}
	}

})