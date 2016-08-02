import template from './user-profile-widget.html'
import controller from './user-profile-widget.controller'

const UserProfileWidget = {
  template,
  bindings: {
    session: '<'
  },
  controller
}

export default UserProfileWidget
