app.factory("ProductFactory", function($http){
	function getData (obj) {
		return obj.data;
	}
	return {
		fetchAll: function(){
			return $http.get("/api/products")
			.then(getData);
		},
		fetchById: function(id){
			return $http.get("/api/products/" + id)
			.then(getData);
		},
		destroyProduct: function(id) {
			return $http.delete("/api/products/" + id)
			.then(getData);
		},
		updateProduct: function(id, updateObj) {
			return $http.put("/api/products/" + id, updateObj)
			.then(getData);
		}
	}
})