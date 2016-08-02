import { getPhoto } from './utils'

class ProfilePictureController {
  constructor (
    $window,
    config,
    toastService
  ) {
    this.hideCaption = true
    this.files = []
    this.photo = getPhoto(this.session.userName, 's', config)

    this.s3Options = {
      extensions: [
        'jpg'
      ],
      bucket: config.s3upload.bucket,
      folder: config.s3upload.folder,
      filename: this.session.userName,
      filesize: 5 * 1024 * 1024,
      region: config.s3upload.region,
      immediate: true,
      on_upload_state_change: (isUploading) => {
        this.uploading = isUploading
      },
      on_success: (message, file) => {
        this.files = []
        if (!file) {
          return
        }
        const reader = new $window.FileReader()
        reader.onload = () => {
          if (!reader.result) {
            return
          }
          this.photo = reader.result
          this.userProfileWidget.setPhoto(reader.result)
        }
        reader.readAsDataURL(file)
      },
      on_error: () => {
        this.files = []
        this.uploading = false
        toastService.error('upload-failed')
      },
      limit: 1,
      replace: true,
      policy: config.s3upload.policy
    }
  }
}

ProfilePictureController.$inject = [
  '$window',
  'config',
  'toastService'
]

export default ProfilePictureController
