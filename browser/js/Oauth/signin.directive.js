'use strict';

app.directive('signin', function () {
  return {
    scope: {
      userInfo: '=',
      text: '@',
      submit: '&'
    },
    templateUrl: '/browser/js/login/login.html'
  }
});
