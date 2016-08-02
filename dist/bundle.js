(function (angular) {
  'use strict';

  angular = 'default' in angular ? angular['default'] : angular;

  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

  var template = "<span\n  uib-dropdown\n  auto-close=\"outsideClick\"\n>\n  <a\n    id=\"user-profile-widget-dropdown\"\n    class=\"clickable\"\n    uib-dropdown-toggle\n  >\n    <img\n      class=\"img-circle\"\n      alt=\"User profile picture\"\n      ng-src=\"{{$ctrl.photo}}\"\n      fb-src=\"assets/images/user.png\"\n      width=\"50\"\n      height=\"50\"\n    >\n    <i\n      class=\"fa fa-caret-down\"\n      aria-hidden=\"true\"\n      title=\"Toggle dropdown menu\"\n    ></i>\n  </a>\n  <ul\n    class=\"dropdown-menu user-profile-widget-popover\"\n    uib-dropdown-menu\n    aria-labelledby=\"user-profile-widget-dropdown\"\n  >\n    <li>\n      <div class=\"row profile\">\n        <div class=\"col-sm-4\">\n          <p class=\"text-center\">\n            <form name=\"profilePicture\">\n              <profile-picture\n                session=\"$ctrl.session\"\n              ></profile-picture>\n            </form>\n          </p>\n        </div>\n        <div class=\"col-sm-8\">\n          <p>\n            <strong\n              ng-bind=\"::$ctrl.session.fullName\"\n            ></strong>\n          </p>\n          <p\n            ng-bind=\"::$ctrl.session.email\"\n          ></p>\n          <div ng-messages=\"profilePicture.$error\" class=\"text-danger\">\n            <div ng-messages-include=\"profile-picture-error-messages.html\"></div>\n          </div>\n        </div>\n      </div>\n    </li>\n    <li>\n      <div class=\"well clearfix\">\n        <a\n          class=\"btn btn-default pull-right clickable\"\n          ng-click=\"$ctrl.logout()\"\n        >Logout</a>\n      </div>\n    </li>\n  </ul>\n</span>\n";

  var utils = __commonjs(function (module, exports) {
  exports.getPhoto = function (userName, size, config) {
    return "https://s3-" + config.s3upload.region + ".amazonaws.com/" + config.s3upload.resizedBucket + "/" + config.s3upload.folder + "resized/" + size + "/" + userName + ".jpg";
  };
  });

  var getPhoto = utils.getPhoto;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var UserProfileWidgetController = function () {
    function UserProfileWidgetController(config, loginService) {
      classCallCheck(this, UserProfileWidgetController);

      this.photo = getPhoto(this.session.userName, 'xs', config);
      this.loginService = loginService;
    }

    createClass(UserProfileWidgetController, [{
      key: 'setPhoto',
      value: function setPhoto(photo) {
        this.photo = photo;
      }
    }, {
      key: 'logout',
      value: function logout() {
        var _this = this;

        return this.loginService.logout().then(function () {
          return _this.loginService.navLogout();
        });
      }
    }]);
    return UserProfileWidgetController;
  }();

  UserProfileWidgetController.$inject = ['config', 'loginService'];

  var UserProfileWidget = {
    template: template,
    bindings: {
      session: '<'
    },
    controller: UserProfileWidgetController
  };

  var errorMessages = "<span ng-message=\"totalsize\">Total size of files is too big.</span>\n<span ng-message=\"totalfiles\">Total number of files is more than allowed, please delete some of them.</span>\n<span ng-message=\"required\">At least one file has to be uploaded.</span>\n<span ng-message=\"extension\">Could not upload that file. Valid extensions are \".jpg\".</span>\n<span ng-message=\"filesize\">One of the files exceed allowed size.</span>\n<span ng-message=\"policy_content\">URL does not provide an S3 policy.</span>\n<span ng-message=\"policy_get\">Cannot retreive S3 policy over URL provided.</span>\n<span ng-message=\"policy_set\">No policy parameter found.</span>\n<span ng-message=\"upload\">Something happened during upload.</span>\n";

  var userProfileWidgetRun = function userProfileWidgetRun($templateCache) {
    $templateCache.put('profile-picture-error-messages.html', errorMessages);
  };

  userProfileWidgetRun.$inject = ['$templateCache'];

  var template$1 = "<div\n  ng-if=\"$ctrl.uploading\"\n  class=\"photo\"\n>\n  <i\n    class=\"fa fa-spinner fa-spin fa-3x\"\n  ></i>\n</div>\n\n<div\n  class=\"photo\"\n  ng-mouseover=\"$ctrl.hideCaption = false\"\n  ng-mouseleave=\"$ctrl.hideCaption = true\"\n  ng-if=\"!$ctrl.uploading\"\n>\n  <div\n    ng-class=\"{\n      'hidden': $ctrl.hideCaption,\n      'caption': !$ctrl.hideCaption\n    }\"\n    s3\n    options=\"$ctrl.s3Options\"\n    ng-model=\"$ctrl.files\"\n  >\n    <span>Change</span>\n  </div>\n  <img\n    class=\"img-circle clickable\"\n    alt=\"User profile picture\"\n    ng-src=\"{{$ctrl.photo}}\"\n    fb-src=\"assets/images/user.png\"\n    width=\"80\"\n    height=\"80\"\n  >\n</div>\n";

  var ProfilePictureController = function ProfilePictureController($window, config, toastService) {
    var _this = this;

    classCallCheck(this, ProfilePictureController);

    this.hideCaption = true;
    this.files = [];
    this.photo = getPhoto(this.session.userName, 's', config);

    this.s3Options = {
      extensions: ['jpg'],
      bucket: config.s3upload.bucket,
      folder: config.s3upload.folder,
      filename: this.session.userName,
      filesize: 5 * 1024 * 1024,
      region: config.s3upload.region,
      immediate: true,
      on_upload_state_change: function on_upload_state_change(isUploading) {
        _this.uploading = isUploading;
      },
      on_success: function on_success(message, file) {
        _this.files = [];
        if (!file) {
          return;
        }
        var reader = new $window.FileReader();
        reader.onload = function () {
          if (!reader.result) {
            return;
          }
          _this.photo = reader.result;
          _this.userProfileWidget.setPhoto(reader.result);
        };
        reader.readAsDataURL(file);
      },
      on_error: function on_error() {
        _this.files = [];
        _this.uploading = false;
        toastService.error('upload-failed');
      },
      limit: 1,
      replace: true,
      policy: config.s3upload.policy
    };
  };

  ProfilePictureController.$inject = ['$window', 'config', 'toastService'];

  var ProfilePicture = {
    template: template$1,
    require: {
      userProfileWidget: '^'
    },
    bindings: {
      session: '<'
    },
    controller: ProfilePictureController
  };

  angular.module('angularNavUserProfileWidget', ['ngMessages', 'fallback.src', 'angular.aws.s3']).run(userProfileWidgetRun).component('userProfileWidget', UserProfileWidget).component('profilePicture', ProfilePicture);

}(angular));