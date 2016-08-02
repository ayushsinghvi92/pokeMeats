app.factory('orderFactory', function ($http) {

  function getData (res) {
    return res.data;
  };

  function appendDetails(orderProduct){
    return $http.get('/api/products/' + orderProduct.productId)
    .then(getData)
    .then(function(product){
      orderProduct.name = product.name;
      orderProduct.description = product.description;
      orderProduct.photo = product.photo;
      orderProduct.id = product.id;
      return orderProduct;
    })
  }

  return {
    updateQuantity: function (orderId, product, quantity) {
      return $http.put('/api/orders/'+ orderId, {
        product:product,
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
        return Promise.all(orderProducts.map(appendDetails))
      })

    },
    deleteOrderProduct: function (orderId, product) {
      return $http.delete('/api/orders/'+ orderId + '/product/' + product.id)
      .then(getData)
    },
    completeOrder : function(id, obj){
      return $http.put('api/orders/' + id, obj)
      .then(getData)
    },
    addNewOrderProduct: function (orderId, product, quantity = 1) {
      return $http.post('/api/orders/'+orderId, {
        product:product,
        quantity:quantity
      })
    }

  }

})
