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
		}
	}

})