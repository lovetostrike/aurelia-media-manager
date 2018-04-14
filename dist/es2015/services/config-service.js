define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigService = (function () {
        function ConfigService(config) {
            this._config = config;
        }
        Object.defineProperty(ConfigService.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (config) {
                this._config = Object.assign({}, this._config, config);
            },
            enumerable: true,
            configurable: true
        });
        return ConfigService;
    }());
    exports.ConfigService = ConfigService;
});
