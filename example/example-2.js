'use strict';

angular.module('slickExampleApp', ['bardo.directives'])
    .controller('SlickCtrl', function ($scope, $sce) {
        $scope.slickConfig = {
            dots: true
        };

        $scope.slickHandle = {
        };

        $scope.isImage = function(media) {
          return media.type === 'img';
        };

        $scope.media = [
            {type: 'img', src: $sce.trustAsResourceUrl('http://www.deshow.net/d/file/travel/2009-04/scenic-beauty-of-nature-photography-1-503-2.jpg')},
            {type: 'img', src: $sce.trustAsResourceUrl('http://www.deshow.net/d/file/travel/2009-04/scenic-beauty-of-nature-photography-1-503-20.jpg')},
            {type: 'img', src: $sce.trustAsResourceUrl('http://www.deshow.net/d/file/travel/2009-04/scenic-beauty-of-nature-photography-1-503-10.jpg')}
        ];
    });

