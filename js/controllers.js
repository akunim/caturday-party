'use strict';

/* Controllers */

var caturdayBackupControllers = angular.module('caturdayBackupControllers', []);

caturdayBackupControllers.controller('CatMonCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.board = $routeParams.board;
    $scope.thread = $routeParams.thread;
    $scope.postnum = $routeParams.postnum;
    var apiGetMon = '/api/' + $scope.board + '/' + $scope.thread + '/' + $scope.postnum;
    var apiGetReplies = '/api/' + $scope.board + '/' + $scope.thread + '/' + $scope.postnum + '/replies';

    $http.get(apiGetMon).success(function(data) {
      $scope.monitoredPost = data;
    });

    $http.get(apiGetReplies).success(function(data) {
      $scope.posts = data;
    });

    $scope.getReplies = function() {
      $http.get(apiGetReplies).success(function(data) {
        $scope.posts = data;
      });
    }

  }]);
