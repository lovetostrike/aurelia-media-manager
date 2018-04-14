Object.defineProperty(exports, "__esModule", { value: true });
var config_service_1 = require("./services/config-service");
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
