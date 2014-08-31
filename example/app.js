'use strict';

angular.module('slickExampleApp', ['bardo.directives'])
    .controller('SlickCtrl', function ($scope, $sce) {

        $scope.slickConfig = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
            onAfterChange: function(slick, index) {
                var slides = $('.slick-track').children().not('.slick-cloned');
                if (index >= slides.length) return;
                $(slides[index]).find('video').each(playVideo);
            }
        };

        $scope.slickHandle = {
        };

        var playVideo = function(index,video){
            var jqVideo = $(video);
            // Pause the carousel for the duration of the video
            $scope.slickHandle.slickPause();

            // Using jQuery element instead, otherwise the native releaseEventHandler on 'ended' doesn't
            // work as intended
            jqVideo.bind('ended', function () {
                $scope.slickHandle.slickPlay();
                jqVideo.unbind('ended');
            });
            video.play();
        };

        $scope.onDirectiveInit = function() {
            $('.slick-slide.slick-active').find('video').each(playVideo);
        };

        // TRY uncommenting these out to support more video types

        /*$scope.isImage = function(media) {
            return media.mimeType === 'image/png' || media.mimeType === 'image/jpeg';
        }

        $scope.isVideo = function(media) {
            return media.mimeType === 'video/mp4';
        }*/

        $scope.media = [
            {mimeType: 'video/mp4', src: $sce.trustAsResourceUrl('https://dl.dropbox.com/s/j3zw8v4qj98478a/cooking.mp4')},
            {mimeType: 'image/jpeg', src: 'http://bardo.io/angular-slick-carousel/app/assets/triology.jpg'},
            {mimeType: 'image/png', src: 'http://bardo.io/angular-slick-carousel/app/assets/rings-43506_640.png'}
        ];
    });

