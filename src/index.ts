import { PLATFORM } from 'aurelia-pal'
import { FrameworkConfiguration } from 'aurelia-framework'
import { ConfigService } from './services/config-service'
import {noop} from './lib/utils'

export function configure (config: FrameworkConfiguration, options: Function): void {
  const defaultOptions = {
    abort: noop,
    sources: [
      {
        name: 'Computer',
        viewModel: './computer-source',
        fileTypes: [
          'image/*',
          'video/*'
        ],
        multiple: true
      },
      {
        name: 'Uploads',
        viewModel: './uploads-source'
      }
    ]
  }
  config.aurelia.use.plugin('aurelia-simple-tabs')
  let mergedOptions = typeof options === 'function' ? options(defaultOptions) : defaultOptions
  config.container.get(ConfigService).config = mergedOptions
  config.globalResources([
    './resources/elements/media-manager',
    './resources/elements/drag-and-drop'
  ])
}
