export class ConfigService {
  private _config: any

  constructor (config: any) {
    this._config = config
  }

  set config (config) {
    this._config = Object.assign({}, this._config, config)
  }

  get config () {
    return this._config
  }
}
