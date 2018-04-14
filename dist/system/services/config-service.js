System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var ConfigService;
    return {
        setters: [],
        execute: function () {
            ConfigService = (function () {
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
            exports_1("ConfigService", ConfigService);
        }
    };
});
