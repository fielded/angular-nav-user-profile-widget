import { getPhoto } from './utils'

class UserProfileWidgetController {
  constructor (
    config,
    loginService
  ) {
    this.photo = getPhoto(this.session.userName, 'xs', config)
    this.loginService = loginService
  }

  setPhoto (photo) {
    this.photo = photo
  }

  logout () {
    return this.loginService.logout()
      .then(() => this.loginService.navLogout())
  }
}

UserProfileWidgetController.$inject = [
  'config',
  'loginService'
]

export default UserProfileWidgetController
