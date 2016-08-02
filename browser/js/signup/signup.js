app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'js/signup/signup.html',
		controller: 'SignupCtrl'
	});
});

app.controller('SignupCtrl', function ($scope, AuthService, $state){
	$scope.sendCredentials = function (credentials) {
		AuthService.signup(credentials) 
		.then(function () {
		AuthService.login(credentials) //why two ajax requests? why not returning??
		})
		.then(function () {
			$state.go('home')
		})
	}
})