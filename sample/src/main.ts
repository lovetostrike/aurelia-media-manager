import {Aurelia} from 'aurelia-framework'

export function configure (aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-media-manager', (config: any) => {
      config.sources.find(source => source.name === 'Computer').fileTypes = [
        'image/*',
        'video/*',
        'application/*'
      ]
      config.sources.push({
        name: 'Test extra app source',
        viewModel: 'components/test-extra-source'
      })
      return config
    })
    .plugin('aurelia-simple-tabs')

  aurelia.start().then(() => aurelia.setRoot('app'))
}
