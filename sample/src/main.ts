import {Aurelia} from 'aurelia-framework'

export function configure (aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-media-manager', {
      fileTypes: ['image/*', 'video/*', 'application/*']
    })
    .plugin('aurelia-simple-tabs')

  aurelia.start().then(() => aurelia.setRoot('app'))
}
