import angular from 'angular'

import UserProfileWidget from './user-profile-widget.component'
import userProfileWidgetRun from './user-profile-widget.run'

import ProfilePicture from './profile-picture.component'

angular
  .module('angularNavUserProfileWidget', [
    'ngMessages',
    'fallback.src',
    'angular.aws.s3'
  ])
  .run(userProfileWidgetRun)
  .component('userProfileWidget', UserProfileWidget)
  .component('profilePicture', ProfilePicture)
