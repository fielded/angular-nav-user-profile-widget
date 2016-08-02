import errorMessages from './profile-picture-error-messages.html'

const userProfileWidgetRun = ($templateCache) => {
  $templateCache.put('profile-picture-error-messages.html', errorMessages)
}

userProfileWidgetRun.$inject = [
  '$templateCache'
]

export default userProfileWidgetRun
