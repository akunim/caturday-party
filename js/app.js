'use strict';

/* App Module */

var caturdayBackupApp = angular.module('caturdayBackupApp', [
  'ngRoute',
  'caturdayBackupControllers',
  'ngSanitize'
]);

caturdayBackupApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/monitor/:board/:thread/:postnum', {
        templateUrl: '/views/partials/monitor-post.html',
        controller: 'CatMonCtrl'
      }).
      otherwise({
        redirectTo: '/monitor'
      });
  }]);
