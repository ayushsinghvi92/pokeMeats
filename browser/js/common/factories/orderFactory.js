app.factory('orderFactory', function ($http, AuthService, $q) {

  function getData (res) {
    return res.data;
  };

  function appendDetails(orderProduct){
    return $http.get('/api/products/' + orderProduct.productId)
    .then(getData)
    .then(function(product){ //definitely should be done on backend, try to mizimize ajax
      orderProduct.name = product.name;
      orderProduct.description = product.description;
      orderProduct.photo = product.photo;
      orderProduct.id = product.id;
      return orderProduct;
    })
  }

  function getOrderProductsFromCache () {
    let orderProducts = localStorage.getItem("pokeMeatProducts") 
    orderProducts = JSON.parse(orderProducts) //ng-local-storage
    if(!orderProducts) orderProducts = [];
    else orderProducts = Array.prototype.slice.apply(orderProducts) // Array.from? explain??
    return orderProducts;
  }

  function setOrderProductsToCache (orderProducts) {
    orderProducts = JSON.stringify(orderProducts);
    localStorage.setItem('pokeMeatProducts', orderProducts);
  }

  return {
    fetchById: function(id) {
      return $http.get("/api/orders/" + id)
      .then(getData)
    },
    updateQuantity: function (orderId, product, quantity) {
      return $http.put('/api/orders/'+ orderId, {
        product:product, //es6: enhanced object literal syntax 
        quantity:quantity
      })
      .then(getData)
    },
    getAllOrderProducts: function (orderId) {
      return $http.get('/api/orders/' + orderId)
      .then(getData)
      .then(order => {
        return order.order_products})
      .then(function(orderProducts){
        return Promise.all(orderProducts.map(appendDetails)) //tons of ajax - bad
      })
    },
    deleteOrderProduct: function (orderId, product) {
      if(!AuthService.isAuthenticated()) {
        let orderProducts = getOrderProductsFromCache();
        let index = -1;
        orderProducts.forEach(function (e, idx) {
          if(e.id === product.id){
            index = idx; //lodash _.find, _.without  
          }
        });
        let destroyedProduct = orderProducts.splice(index, 1); //mutability of operation
        setOrderProductsToCache(orderProducts);
        return $q.when(destroyedProduct) //nice!! great abstraction of authentication
      }

      return $http.delete('/api/orders/'+ orderId + '/product/' + product.id)
      .then(getData)
    },
    addNewOrderProduct: function (orderId, product, quantity = 1) {

      if(!AuthService.isAuthenticated()) {

        let orderProducts = getOrderProductsFromCache()
        product['unit_price'] = product.price;
        console.log(product.unit_price)
        product['quantity'] = quantity;
        orderProducts.push(product);
        setOrderProductsToCache(orderProducts)
        return $q.when(orderProducts)
      }

      return $http.post('/api/orders/'+orderId, {
        product:product,
        quantity:quantity
      })
    }
  }

})
