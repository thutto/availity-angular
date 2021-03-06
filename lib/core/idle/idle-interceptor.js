(function(root) {

  'use strict';

  var availity = root.availity;

  availity.core.factory('avIdleInterceptor', function(avIdle) {
    return {
      response: function(response) {
        return avIdle.response(response);
      },
      responseError: function(response) {
        return avIdle.responseError(response);
      }
    };

  });

  availity.core.config(function($httpProvider) {
    $httpProvider.interceptors.push('avIdleInterceptor');
  });

})(window);
