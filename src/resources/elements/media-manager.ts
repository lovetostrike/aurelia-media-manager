import { autoinject, bindable} from 'aurelia-framework';
import { ConfigService } from '../../services/config-service';

@autoinject
export class MediaManager {
  @bindable private uploads: Array<any> = []
  private sources: any[]
  private abort: Function

  constructor(private configService: ConfigService) {
    const config = configService.config
    this.sources = config.sources
    this.abort = config.abort
  }

  getMediaSourceModel(source: Object) {
    return {
      source,
      uploads: this.uploads
    }
  }
}
