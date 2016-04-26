'use strict';

angular.module('helloWorldApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('feedback', {
        url: '/feedback',
        template: '<feedback></feedback>'
      });
  });
