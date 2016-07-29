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
		}
	}
})