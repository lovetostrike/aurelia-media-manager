define(["require", "exports", "./services/config-service"], function (require, exports, config_service_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config, options) {
        console.log(options);
        var noop = function () { };
        var defaultOptions = {
            fileTypes: [
                'image/*',
                'video/*'
            ],
            multiple: true,
            abort: noop
        };
        config.container.get(config_service_1.ConfigService).config = Object.assign({}, defaultOptions, options || {});
        config.globalResources([
            './resources/elements/drag-and-drop'
        ]);
    }
    exports.configure = configure;
});
