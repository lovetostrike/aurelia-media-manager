import { PLATFORM } from 'aurelia-pal'
import { FrameworkConfiguration } from 'aurelia-framework'
import { ConfigService } from './services/config-service'
import {noop} from './lib/utils'

export function configure (config: FrameworkConfiguration, options: any): void {
  const defaultOptions = {
    fileTypes: [
      'image/*',
      'video/*'
    ],
    multiple: true,
    abort: noop
  }
  config.aurelia.use.plugin('aurelia-simple-tabs')
  config.container.get(ConfigService).config = Object.assign({}, defaultOptions, options || {})
  config.globalResources([
    './resources/elements/media-manager',
    './resources/elements/drag-and-drop'
  ])
}
