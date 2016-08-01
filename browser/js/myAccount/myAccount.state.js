app.config(function ($stateProvider) {
  $stateProvider.state('myAccount', {
    url: '/myAccount',
    templateUrl: 'js/myAccount/myAccount.html',
    controller: 'MyAccountController',
    resolve: {
      user: function(AuthService){
         return AuthService.getLoggedInUser()
      }
    }
  });
});
