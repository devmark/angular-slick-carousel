'use strict';

angular.module('slickExampleApp', ['slickCarousel', 'ngRoute'])
    .config(function (slickCarouselConfig) {
        slickCarouselConfig.dots = true;
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'SlickController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .controller('SlickController', function ($scope, $sce, $timeout) {

        var playVideo = function (index, video) {
            var jqVideo = $(video);
            // Pause the carousel for the duration of the video
            $scope.slickConfig.method.slickPause();

            // Using jQuery element instead, otherwise the native releaseEventHandler on 'ended' doesn't
            // work as intended
            jqVideo.bind('ended', function () {
                $scope.slickConfig.method.slickPlay();
                jqVideo.unbind('ended');
            });
            video.play();
        };

        $scope.slickConfig = {
            autoplay: true,
            draggable: false,
            autoplaySpeed: 3000,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                    console.log('before change');
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                    $(slick.$slides[currentSlide]).find('video').each(playVideo);
                },
                breakpoint: function (event, slick, breakpoint) {
                    console.log('breakpoint');
                },
                destroy: function (event, slick) {
                    console.log('destroy');
                },
                edge: function (event, slick, direction) {
                    console.log('edge');
                },
                reInit: function (event, slick) {
                    console.log('re-init');
                },
                init: function (event, slick) {

                    console.log('init', slick);
                },
                setPosition: function (evnet, slick) {
                    console.log('setPosition');
                },
                swipe: function (event, slick, direction) {
                    console.log('swipe');
                }
            }
        };

        $scope.slickConfig2 = {
            method: {},
            slidesToShow: 3,
            slidesToScroll: 3
        };

        $scope.slickConfig3 = {
            method: {},
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        $scope.slickConfig4 = {
            method: {},
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true
        };

        $scope.number = [1, 2, 3, 4, 6, 7, 8];
        $scope.number2 = [1, 2, 33, 4, 6, 7, 8];
        $scope.number4 = [225, 125, 200, 175, 150, 300];

    }).directive('myDirective', function () {
        return {
            template: '<div class="something"> This is my directive content</div>'
        }
    });

