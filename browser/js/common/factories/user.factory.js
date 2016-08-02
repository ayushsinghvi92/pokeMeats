app.factory('userFactory', function(AuthService, $q, $http, orderFactory) {

    let getData = (res => res.data); //abstracted to factory 
    return {
        // can be logically optimized
        getActiveOrderId: function() {
            return AuthService.getLoggedInUser()
                .then(user => user.id)
                .then(userId => $http.get('/api/users/' + userId + '/orders/'))
                .then(getData)
                .then(function(orders) {
                    return orders.filter(function(order) {
                        return order.checkout_status === 'in_progress';
                    })
                })
                .then(orders => orders[0].id) //instantiate new order after user signs up maybe?
        },
        getActiveOrder: function() {
            if (!AuthService.isAuthenticated()) {
            	//what if I'm logged out and don't have an order??
                let orderProducts = JSON.parse(localStorage.getItem('pokeMeatProducts')); //ng-localStorage might be better solution
                if (orderProducts) {
                    return $q.when(Array.prototype.slice.apply(orderProducts)) // nice use 
                }
            }
        return this.getActiveOrderId() //indentation?? assumes authenticated user
                .then(orderFactory.getAllOrderProducts)
        },
        fetchAll: function() {
            return $http.get("/api/users")
                .then(getData)
        },
        fetchById: function(id) {
            return $http.get("/api/users/" + id)
                .then(getData);
        },
        destroyUser: function(id) {
            return $http.delete("/api/users/" + id)
                .then(getData)
        },
        updateUser: function(id, updateObj) {
            return $http.put("/api/users/" + id, updateObj)
                .then(getData)
        },
        createUserAddress: function(userId, address) {
            return $http.post(`/api/users/' + userId + '/addresses`, address) //es6 template strings
                .then(getData);
        },
        updateUserAddress: function(userId, address, addressId) {
            return $http.put('/api/users/' + userId + '/addresses/' + addressId, address) //es6 template strings
                .then(getData);
        },
        deleteUserAddress: function(userId, addressId) {
            return $http.delete('/api/users/' + userId + '/addresses/' + addressId)
                .then(getData);
        },
        fetchAllUserAddresses: function(userId) {
            return $http.get('/api/users/' + userId + '/addresses')
                .then(getData);
        },
        fetchAllUserOrders: function(userId) {
            let completeOrders;
            return $http.get('api/users/' + userId + '/orders')//template strings
                .then(getData)
                .then(userOrders => {
                    completeOrders = userOrders;
                    let userOrderProducts = userOrders.map(function(userOrder) {
                        return orderFactory.getAllOrderProducts(userOrder.id) //definitely should be abstracted to backend, try to minimize ajax requests
                    });
                    return Promise.all(userOrderProducts)// nice promise.all
                })
                .then(function(userOrderProducts) {
                    completeOrders.forEach((userOrder, index) => { 
                        userOrder.userOrderProducts = userOrderProducts[index];
                    });
                    return completeOrders;
                });
        }
    }

})
