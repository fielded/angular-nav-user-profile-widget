import template from './profile-picture.html'
import controller from './profile-picture.controller'

const ProfilePicture = {
  template,
  require: {
    userProfileWidget: '^'
  },
  bindings: {
    session: '<'
  },
  controller
}

export default ProfilePicture
