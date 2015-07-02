angular-slick-carousel
======================

[![Join the chat at https://gitter.im/kbdaitch/angular-slick-carousel](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/kbdaitch/angular-slick-carousel?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Angular directive for [slick-carousel](http://kenwheeler.github.io/slick/)

Release: 2.0
------------
1. Singlemost improvement which triggered the development of this release: the `$timeout` in v1.0
was working but arbitrary. We now register a simple `onFinishRender` directive which
allows us to postpone slickification until `ng-repeat` has finished execution.
2. **[BC-BREAK]** The directive is no longer based on a transclude functionality. You can either use the 2.0
 directive with the provided template or use your own (when using the `src` attribute).
3. **[BC-BREAK]** The directive no longer supports statically provided image assets out-of-the-box.
The dynamic usecase is what it tries to solve optimally.
4. You should now use JS to specify a variety of sources in the `media` array. See [example](https://github.com/kbdaitch/angular-slick-carousel/blob/master/example/index.html).

Usage
-----

This directive allows you to use the slick-carousel plugin as
an angular directive. It can be specified in your HTML
as either a `<div>` attribute or a `<slick>` element.

```html
<slick settings="scoped-settings"
  control="scoped-control-handle"
  media="media" 
  src="optionalCustomTemplate.html"
  on-directive-init="onDirectiveInit()"
  is-image="isImage(media)" 
  is-video="isVideo(media)">
</slick>
```

### Attributes ###
1. `settings`: optional `Object` containing any of the slick options. Consult [here](http://kenwheeler.github.io/slick/#settings).
2. `control`: optional `Object` discussed [below](#control) in detail
3. `media`: mandatory `Array` of images and/or video
4. `src`: optional `String` the url for the custom template, if desired. Remember to specify `on-finish-render="init"` in the parent `div` of your template. `scope.init` is already defined by the directive,
so you need not worry about defining it.

    ```html
    <script type="text/ng-template" id="optionalCustomTemplate.html">
    <div ng-repeat="card in media" class="slide" on-finish-render="init()">
        <!-- use card, ng-include it, ng-html-bind it, or whatever -->
    </div>
    </script>
    ```
5. `on-directive-init`: optional `Function` the directive's handle object is ready to use in this function. This is different from `slick`'s `onInit` handler.
6. `is-image`: optional `Function` that takes a metadata object and returns a `Boolean`
7. `is-video`: optional `Function` that takes a metadata object and returns a `Boolean`

### Steps ###
1. Include the `slick.js` at the base of this repo, or install through `bower`:

  ```bash
  bower install angular-slick-carousel
  ```

2. Add it to your HTML using usual `<script>` tags.
3. In your angular app definition, define `bardo.directives` as a dependency.
  ```js
  angular.module('slickExampleApp', ['bardo.directives'])
  ```

4. That should be it. Now, you can specify the usual
 options to the carousel plugin using either a JavaScript
`settings` object on `scope`, or as `data-<setting-name>`
 attributes in the HTML tag itself. Note that specifying `data-` prefixed names
 helps avoid issues with camel-cased settings options.

### Control ###
1. All the functions in the plugin are exposed through a control
attribute.
2. To utilize this architecture, and have two-way data-binding,
define an empty control handle on scope:
  ```js
  $scope.slickHandle = {

  };
```

3. Pass it as the value to control attribute. Now, you can call any plugin methods
as shown in the example.

  ```html
  <button ng-click="slickHandle.slickGoTo(2)">slickGoTo(2)</button>
  <button ng-click="slickHandle.slickPrev()">slickPrev()</button>
  <button ng-click="slickHandle.slickNext()">slickNext()</button>
  <button ng-click='slickHandle.slickAdd("<div>New</div>")'>slickAdd()</button>
  <button ng-click='slickHandle.slickRemove(3)'>slickRemove(3)</button>
  <button ng-click='slickHandle.slickPlay()'>slickPlay()</button>
  <button ng-click='slickHandle.slickPause()'>slickPause()</button>
  ```

Ajax/dynamic Usecase
---------------------

Looks like doing in in-place changes to the `media` object is not liked by the underlying slick plugin by Ken Wheeler. That could be the reason why he provided `slickAdd` in the API.

One could implement some simple media store independent of the `media` object used by the directive. One could then add a watcher on your store, and on change in its value, find the differential, and add/remove the pertinent slides from the slick element using the API, as shown in the [plunkr](http://plnkr.co/edit/w3zCY0wxFBqYAD2ZLcAG?p=preview).

Please note that here I worked out the logic in a controller, it would be more semantically correct (since it uses the `slickAdd` API to manipulate the DOM), if it was done inside another directive, which in turn, could use my slick directive.

In the above plunkr, I use the `$compile` service to create new scopes, which may be pricy depending on frequency of changes to the `mediaStore`. One could do some bookkeeping and explicity call `$destroy` as mentioned [here](https://docs.angularjs.org/api/ng/type/$rootScope.Scope).

For more discussion, see this [issue](https://github.com/kbdaitch/angular-slick-carousel/issues/8).



Demo
----

1. Look at the [example](https://github.com/kbdaitch/angular-slick-carousel/tree/master/example) in this repo for full usage.
2. Running [example](http://bardo.io/angular-slick-carousel/app/index.html).
3. Or, clone the repo and run a simple HTTP server in the example directory.

[![Support via Gratipay](https://cdn.rawgit.com/twolfson/gittip-badge/1.1.0/dist/gratipay.png)](https://www.gratipay.com/kbdaitch/)
