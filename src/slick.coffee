module = angular.module('bardo.directives', [])

module.directive 'onFinishRender', ->

  restrict: 'A'
  link: (scope, element, attr) ->
    if (scope.$last is true)
      scope.$evalAsync(attr.onFinishRender);

module.directive 'slick', ['$timeout', '$templateCache', ($timeout, $templateCache) ->

  $templateCache.put 'angular-slick-carousel/template.html',
    """
      <div class="multiple" ng-repeat="m in media" on-finish-render="init()">
        <img ng-if="isImage({media: m})" ng-src="{{m.src}}" />
        <video ng-if="isVideo({media: m})" ng-src="{{m.src}}" type="{{m.mimeType}}" ></video>
      </div>
    """

  # Whitelist of options that will be parsed from the element's attributes and passed into slick
  SLICK_OPTION_WHITELIST = [
    'accessiblity',
    'autoplay',
    'autoplaySpeed',
    'arrows',
    'cssEase',
    'dots',
    'draggable',
    'fade',
    'easing',
    'infinite',
    'onBeforeChange',
    'onAfterChange',
    'pauseOnHover',
    'responsive',
    'slide',
    'slidesToShow',
    'slidesToScroll',
    'speed',
    'swipe',
    'touchMove',
    'touchThreshold',
    'vertical'
  ]

  # Whitelist of functions that the control API in this directive accepts
  SLICK_FUNCTION_WHITELIST = [
    'slickGoTo',
    'slickNext',
    'slickPrev',
    'slickPause',
    'slickPlay',
    'slickAdd',
    'slickRemove',
    'slickFilter',
    'slickUnfilter',
    'unslick'
  ]

  isEmpty = (value) ->
    if angular.isArray(value)
      return value.length is 0
    else if angular.isObject(value)
      return false for key of value when value.hasOwnProperty(key)
    true

  scope: {
    settings: '='
    control: '='
    media: '='
    onDirectiveInit: '&',
    isImage: '&',
    isVideo: '&'
  }
  templateUrl: (tElement, tAttrs) ->
    return tAttrs.src if tAttrs.src
    return 'angular-slick-carousel/template.html'
  restrict: 'AE'
  terminal: true
  link: (scope, element, attr) ->

    unless typeof attr.isImage is 'function'
      scope.isImage = (params) ->
        params.media.mimeType is 'image/png' || params.media.mimeType is 'image/jpeg'

    unless typeof attr.isVideo is 'function'
      scope.isVideo = (params) ->
        params.media.mimeType is 'video/mp4'

    element.addClass('bardo-slick')

    # Take a hash of options from the chosen directive
    options = scope.settings or {}

    # Options defined as attributes take precedence
    angular.forEach attr, (value, key) ->
      options[key] = scope.$eval(value) if key in SLICK_OPTION_WHITELIST


    scope.init = ->
      # Call slick to initiate carousel
      slick = element.slick(options)

      # Link slick functions with bi-directional control binding, if any
      scope.internalControl = scope.control || {}
      SLICK_FUNCTION_WHITELIST.forEach (value) ->
        # Delegate to underlying slick function with context set to element
        scope.internalControl[value] = ->
          slick[value].apply(slick, arguments)
          return
        return

      scope.onDirectiveInit()
      return

    return
  
  ]
