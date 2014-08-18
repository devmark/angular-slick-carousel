'use strict';

angular.module('slickExampleApp', ['bardo.directives'])
  .controller('SlickCtrl', function ($scope) {
  	$scope.referrer = document.referrer;
  	
    $scope.slickConfig = {
      dots: true
    };

    $scope.slickHandle = {

    };
  });
