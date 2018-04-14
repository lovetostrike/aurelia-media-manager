System.register(["./services/config-service"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    var config_service_1;
    return {
        setters: [
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            }
        ],
        execute: function () {
        }
    };
});
