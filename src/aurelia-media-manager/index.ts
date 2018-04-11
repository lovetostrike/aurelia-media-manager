import { PLATFORM } from 'aurelia-pal'
import { FrameworkConfiguration } from 'aurelia-framework'
import { ConfigService } from './services/config-service'

export function configure (config: FrameworkConfiguration, options): void {
  const noop = () => {}
  const defaultOptions = {
    fileTypes: [
      'image/*',
      'video/*'
    ],
    multiple: true,
    abort: noop
  }
  config.container.get(ConfigService).config = Object.assign({}, defaultOptions, options || {})
  config.globalResources([
    PLATFORM.moduleName('./resources/elements/drag-and-drop')
  ])
}
