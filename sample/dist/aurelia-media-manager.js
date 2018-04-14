(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("aurelia-media-manager", {}, function(___scope___){
___scope___.file("resources/elements/drag-and-drop.html", function(exports, require, module, __filename, __dirname){

module.exports.default =  "<template>\n  <require from='./drag-and-drop.scss'></require>\n  <require from='./progress-bar.html'></require>\n\n  <h2 show.bind='uploads.length'>Uploads</h2>\n  <ul show.bind='uploads.length' class='uploads'>\n    <li repeat.for='upload of uploads'>\n      <div class='file-info'>\n        <div class='file-attributes'>\n          ${upload.file.name} - ${upload.file.size} - ${upload.file.type}\n        </div>\n        <div if.bind='upload.progress === 100 && !upload.cancelled' class='icon complete-btn'></div>\n        <div if.bind='upload.cancelled' class='error'>CANCELLED</div>\n      </div>\n      <div class='progress-container' if.bind='upload.progress !== 100 && !upload.cancelled'>\n        <progress-bar percentage.bind='upload.progress'></progress-bar>\n        <span class='icon btn cancel-btn' click.delegate='abortUpload($index)'></span>\n      </div>\n    </li>\n  </ul>\n\n  <label for.one-time='id' tr='uploadMedia'>\n    <div\n      drop.delegate='handleDrop($event)'\n      dragover.delegate='$event.preventDefault()'\n      class='upload-controls'\n    >\n      <div class='upload-icon'></div>\n      <div>Drag files here or click here to upload</div>\n  </label>\n\n  <input\n    type='file'\n    id.one-time='id'\n    accept.one-time='fileTypes.join()'\n    change.delegate='handleInputChange($event)'\n    multiple.one-time='multiple'\n  />\n</template>\n"
});
___scope___.file("resources/elements/progress-bar.html", function(exports, require, module, __filename, __dirname){

module.exports.default =  "<template bindable='percentage'>\n  <require from='./progress-bar.scss'></require>\n\n  <div class='progress'>\n    <span class='text'>${percentage}%</span>\n    <div class='meter' css='width: ${percentage}%'></div>\n  </div>\n</template>\n"
});
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var config_service_1 = require("./services/config-service");
var utils_1 = require("./lib/utils");
function configure(config, options) {
    var defaultOptions = {
        fileTypes: [
            'image/*',
            'video/*'
        ],
        multiple: true,
        abort: utils_1.noop
    };
    config.container.get(config_service_1.ConfigService).config = Object.assign({}, defaultOptions, options || {});
    config.globalResources([
        './resources/elements/drag-and-drop'
    ]);
}
exports.configure = configure;
//# sourceMappingURL=aurelia-media-manager.js.map
});
___scope___.file("services/config-service.js", function(exports, require, module, __filename, __dirname){

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
//# sourceMappingURL=config-service.js.map
});
___scope___.file("lib/utils.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var noop = function () { };
exports.noop = noop;
//# sourceMappingURL=utils.js.map
});
___scope___.file("lib/file-upload.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var uploadFiles = function (files, handlers) {
    return files.map(function (file, index) {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function (event) {
            handlers.progress(event, index);
        }, false);
        xhr.upload.addEventListener('load', function (event) {
            handlers.load(event, index);
        }, false);
        xhr.upload.addEventListener('abort', function (event) {
            handlers.abort(event, index);
        }, false);
        xhr.open('POST', 'http://localhost:3000/upload', true);
        var formData = new FormData();
        formData.append("file" + index, file);
        xhr.send(formData);
        return xhr;
    });
};
exports.uploadFiles = uploadFiles;
//# sourceMappingURL=file-upload.js.map
});
___scope___.file("resources/elements/drag-and-drop.js", function(exports, require, module, __filename, __dirname){

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_service_1 = require("../../services/config-service");
var aurelia_framework_1 = require("aurelia-framework");
var file_upload_1 = require("../../lib/file-upload");
var DragAndDrop = (function () {
    function DragAndDrop(configService) {
        var _this = this;
        this.configService = configService;
        this.uploads = [];
        this.handleInputChange = function (event) {
            var input = event.target;
            _this.uploadFiles(input.files);
        };
        this.handleDrop = function (event) {
            var files = Array.from(_this.multiple ? event.dataTransfer.files : [event.dataTransfer.files[0]])
                .filter(function (file) { return _this.fileTypes.includes(file.type) ||
                _this.fileTypes.includes(file.type.split('/')[0] + "/*"); });
            event.dataTransfer.clearData();
            _this.uploadFiles(files);
        };
        this.handleUploadProgress = function (event, fileIndex) {
            if (event.lengthComputable) {
                var percentage = Math.round((event.loaded * 100) / event.total);
                _this.updateUploadProgress(fileIndex, percentage);
            }
        };
        this.handleLoadComplete = function (event, fileIndex) {
            _this.updateUploadProgress(fileIndex, 100);
            _this.uploads[fileIndex].xhr = null;
        };
        this.handleAbort = function (event, fileIndex) {
            _this.uploads[fileIndex].cancelled = true;
            _this.abort(_this.uploads[fileIndex]);
        };
        this.id = "aurelia-media-manager-" + Date.now();
        var defaultConfig = this.configService.config;
        this.fileTypes = this.fileTypes || defaultConfig.fileTypes;
        this.abort = this.abort || defaultConfig.abort;
        this.multiple = typeof this.multiple === 'undefined' ? defaultConfig.multiple : this.multiple;
    }
    DragAndDrop.prototype.abortUpload = function (fileIndex) {
        this.uploads[fileIndex].xhr.abort();
    };
    DragAndDrop.prototype.updateUploadProgress = function (index, percentage) {
        var upload = this.uploads[index];
        upload.progress = percentage;
        this.uploads.splice(index, 1, upload);
    };
    DragAndDrop.prototype.uploadFiles = function (files) {
        var _this = this;
        this.uploads = [];
        var filesToUpload = Array.isArray(files) ? files : Array.from(files);
        filesToUpload.forEach(function (file) {
            _this.uploads.push({
                file: file,
                progress: 0
            });
        });
        var xhrs = file_upload_1.uploadFiles(filesToUpload, {
            'progress': this.handleUploadProgress,
            'load': this.handleLoadComplete,
            'abort': this.handleAbort
        });
        this.uploads = xhrs.map(function (xhr, index) {
            _this.uploads[index].xhr = xhr;
            return _this.uploads[index];
        });
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], DragAndDrop.prototype, "fileTypes", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], DragAndDrop.prototype, "abort", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], DragAndDrop.prototype, "multiple", void 0);
    DragAndDrop = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" && _a || Object])
    ], DragAndDrop);
    return DragAndDrop;
    var _a;
}());
exports.DragAndDrop = DragAndDrop;
//# sourceMappingURL=drag-and-drop.js.map
});
___scope___.file("resources/index.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
function configure(config) {
}
exports.configure = configure;
//# sourceMappingURL=index.js.map
});
___scope___.file("resources/value-converters/get-value.js", function(exports, require, module, __filename, __dirname){

Object.defineProperty(exports, "__esModule", { value: true });
var GetValueValueConverter = (function () {
    function GetValueValueConverter() {
    }
    GetValueValueConverter.prototype.toView = function (value, index) {
        return value[index];
    };
    return GetValueValueConverter;
}());
exports.GetValueValueConverter = GetValueValueConverter;
//# sourceMappingURL=get-value.js.map
});
___scope___.file("resources/elements/drag-and-drop.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("resources/elements/drag-and-drop.scss", "drag-and-drop {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  drag-and-drop .upload-controls {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 1em;\n    border: dotted 2px black;\n    cursor: pointer; }\n    drag-and-drop .upload-controls:hover {\n      background: lightgray;\n      opacity: 0.8; }\n    drag-and-drop .upload-controls div {\n      margin: 0.5em; }\n  drag-and-drop input {\n    opacity: 0;\n    width: 0; }\n  drag-and-drop .upload-icon {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAFNUlEQVR4nO2cX2gcRRzHPxMOOcoRSpFQQggxxlCKSBF9iaLQB5EiWKEUERFF/PPsmyCIj30Sn0qRElqp+lzUKm2IIopviqJIGoqgoiBKhNhck/TGh99eurnOXm/Tmd/s5ua7DKHHduc3n/vd/H67+5sxFktSeI3ENmBYlEArKYFWUgKtpEZsA8rIYFrAKNABViy2HdmkgVUbjzaYWeAd4EtgAXjTYMbiWlVCtgYHMAFcAK4DNmvXgFPAntj2DTSG2Abc0kA4BHzRA7nbNoBzwERsO285jtgG9DUOJvtAznv2OaAV296+Y4ltgNMoiR0HHNNFUdsA3gXGYtteOKbYBjiNgnuBxQEh5z37PWB/bPudY4ptwE0GSeD7rCTkPOzTVQyQ0Q3YZkz/wDdoq2SAjG7AliEw5QFyb4AcjT2urfFFN+BG4NvpdFGLABnfALhvB4GvbIAcjz7OyJAngIuBIOdhz8cOkPE69hP4ahMg43QK04qQewPk3l0PmnCBr4xnnyZCgNTtTAKfticXebZqgNTrSB4QLUSGnId9BsUAGb4DmS7ur4Anu6YRtQAZvgOYqSDkvGd/AOyrLWhuBL7QebIPz54ncIAMCVozT/bh2UGnkVCQJwl3Wx0adpAAGQLybA0hd9sGko3c6ZuL13IDg2kAx4GHqVEpQ04N4Chw2PeFfcNoAPdQs8KcHo0C4wbjlY1v0JvAt8C65+tq6h9g2WI7Pi/qFbTFbgKfAN/4vK6iOsBHBLDfZAHM70Ux+4CngbspN41MA094MGEV+cL/LPF/2siv8bzFXvVgw3aFSGVuI2M5ip/s4VdgLvZ48kcdM4NaKoFWUgKtpARaSQm0khJoJSXQSkqglZRAKymBVlICraQEWkkJtJISaCUl0EpKoJWUQCspgVZSAq2k3Qraa6mAD1UN9Drg4w10O2uVUdVA/wR8ze155CbwOXDFh0HeFPs1fP5Avvg5pKZ6jfJlBv8iCzhnYo+l9ygsoMn2K3oOeBJZp+2znm4deNFiLxX0PQo0Kf+L6wCr1lEAkxVgvgU8v4Pr9tNV4HukCvVTW7ShVoFnTSFLDkKVx17Prq+25g9ZR/NjwDGtAa9RUF/tMqiJfPPXAhplgb+RX0xDAXIL2ehqI/CYfgeODAp6HLgc2KBu+ws4EhI2Uob7htJ4LAU7l7kMm1Lw5ny7DDwDNANAHgNOIEFSazwXcKzycgW4EeAOx+ehNIN4wVMG8zbwC1INuk75NG8Emfr2Ag8AryP7M2mOx9lXVSrzW8Ax4HEkgv8MrCA5cRk1ES8+hJQAawLuq6qA7qqF5NFzsQ3xrardGe5aJdBKSqCVlEArqWrBUEtXgPeRtS4PInn8nj7nryKrtRaBu4BnkY23BpcjyZ9GL7mP0b4CZnvGfBy5S3Wdv0b2ICp3/gHkS3Kdv4DjhmUYp45TFrvU89mlrLm0BHxoty/wXALOlul0GEF/5/hsBbkjdWnJ9jz6zKD/UKbTYQR90PFZi+I5dzp7lr2lbJ34bJlOhxH0SwYz2f1HBu0R4LGC8w8Cx7qL8LO/k8ALZTodxqzjMPCxwcwDvyFZx6uIV7vUBE4CjxrMIvJ085Xs7+AawqwjdBs46+hQsVf1NZOTnQt0G1gOa8uu1jIO2C7QK8B5yj8LTpJtKxZweXWfV0Angf+IP+fVpf0BvEzuDjJ/9Kvr6G5u8hCwn+HMUAZRd6q9iGyq4nz91ncHmixnbFGhV0IVVDd5aBdBhkBb/STdrGG8M4yiBFpJCbSSEmglJdBK+h+yvGotlCx8XAAAAABJRU5ErkJggg==\");\n    width: 5em;\n    height: 5em;\n    background-size: contain;\n    background-repeat: no-repeat; }\n  drag-and-drop .uploads {\n    width: 80vw;\n    max-width: 25em;\n    max-height: 25em;\n    overflow-y: auto;\n    padding: 0; }\n    drag-and-drop .uploads li {\n      list-style: none;\n      padding: 0.5em;\n      border-bottom: solid 1px grey; }\n      drag-and-drop .uploads li:last-child {\n        border: none; }\n    drag-and-drop .uploads .progress-container, drag-and-drop .uploads .file-info {\n      display: flex;\n      justify-content: space-between;\n      align-items: center; }\n    drag-and-drop .uploads .progress-container progress-bar {\n      flex-basis: 85%; }\n    drag-and-drop .uploads .icon {\n      display: inline-block;\n      width: 1.5em;\n      height: 1.5em;\n      background-size: contain; }\n    drag-and-drop .uploads .file-info .file-attributes {\n      flex-basis: 85%; }\n    drag-and-drop .uploads .file-info .complete-btn {\n      background-image: url(\"data:image/png;base64,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\"); }\n    drag-and-drop .uploads .cancel-btn {\n      background-image: url(\"data:image/png;base64,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\"); }\n  drag-and-drop .error {\n    color: red; }\n  drag-and-drop .btn {\n    cursor: pointer; }\n\n/*# sourceMappingURL=/css-sourcemaps/045e559d2.map */")
});
___scope___.file("resources/elements/progress-bar.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("resources/elements/progress-bar.scss", "progress-bar .progress {\n  position: relative;\n  padding: 0.2em;\n  border-radius: 1em;\n  background: grey; }\n\nprogress-bar .text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%); }\n\nprogress-bar .meter {\n  background-color: green;\n  height: 1em;\n  border-radius: 1em; }\n\n/*# sourceMappingURL=/css-sourcemaps/04b31c7a3.map */")
});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
    module.exports = global.require("events");
} else {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    EventEmitter.defaultMaxListeners = 10;

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
    };

    EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;

        if (!this._events)
            this._events = {};

        // If there is no 'error' event listener then throw.
        if (type === "error") {
            if (!this._events.error ||
                (isObject(this._events.error) && !this._events.error.length)) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er; // Unhandled 'error' event
                }
                throw TypeError("Uncaught, unspecified \"error\" event.");
            }
        }

        handler = this._events[type];

        if (isUndefined(handler))
            return false;

        if (isFunction(handler)) {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                    // slower
                default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
            }
        } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }

        return true;
    };

    EventEmitter.prototype.addListener = function(type, listener) {
        var m;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events)
            this._events = {};

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
            this.emit("newListener", type,
                isFunction(listener.listener) ?
                listener.listener : listener);

        if (!this._events[type])
        // Optimize the case of one listener. Don't need the extra array object.
            this._events[type] = listener;
        else if (isObject(this._events[type]))
        // If we've already got an array, just append.
            this._events[type].push(listener);
        else
        // Adding the second element, need to change to array.
            this._events[type] = [this._events[type], listener];

        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            } else {
                m = EventEmitter.defaultMaxListeners;
            }

            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory " +
                    "leak detected. %d listeners added. " +
                    "Use emitter.setMaxListeners() to increase limit.",
                    this._events[type].length);
                if (typeof console.trace === "function") {
                    // not supported in IE 10
                    console.trace();
                }
            }
        }

        return this;
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        var fired = false;

        function g() {
            this.removeListener(type, g);

            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    };

    // emits a 'removeListener' event iff the listener was removed
    EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events || !this._events[type])
            return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener ||
            (isFunction(list.listener) && list.listener === listener)) {
            delete this._events[type];
            if (this._events.removeListener)
                this.emit("removeListener", type, listener);

        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener ||
                    (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if (position < 0)
                return this;

            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }

            if (this._events.removeListener)
                this.emit("removeListener", type, listener);
        }

        return this;
    };

    EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;

        if (!this._events)
            return this;

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {};
            else if (this._events[type])
                delete this._events[type];
            return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === "removeListener") continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        } else if (listeners) {
            // LIFO order
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];

        return this;
    };

    EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
            ret = [];
        else if (isFunction(this._events[type]))
            ret = [this._events[type]];
        else
            ret = this._events[type].slice();
        return ret;
    };

    EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
            var evlistener = this._events[type];

            if (isFunction(evlistener))
                return 1;
            else if (evlistener)
                return evlistener.length;
        }
        return 0;
    };

    EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
    };

    function isFunction(arg) {
        return typeof arg === "function";
    }

    function isNumber(arg) {
        return typeof arg === "number";
    }

    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }

    function isUndefined(arg) {
        return arg === void 0;
    }
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

/**
 * Listens to 'async' requets and if the name is a css file
 * wires it to `__fsbx_css`
 */

var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";

var cssHandler = function(__filename, contents) {
    if (runningInBrowser) {
        var styleId = __filename.replace(/[\.\/]+/g, '-');
        if (styleId.charAt(0) === '-') styleId = styleId.substring(1);
        var exists = document.getElementById(styleId);
        if (!exists) {
            //<link href="//fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">
            var s = document.createElement(contents ? 'style' : 'link');
            s.id = styleId;
            s.type = 'text/css';
            if (contents) {
                s.innerHTML = contents;
            } else {
                s.rel = 'stylesheet';
                s.href = __filename;
            }
            document.getElementsByTagName('head')[0].appendChild(s);
        } else {
            if (contents) {
                exists.innerHTML = contents;
            }
        }
    }
}
if (typeof FuseBox !== "undefined" && runningInBrowser) {
    FuseBox.on('async', function(name) {
        if (/\.css$/.test(name)) {
            cssHandler(name);
            return false;
        }
    });
}

module.exports = cssHandler;
});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('fusebox-websocket').SocketClient, bundleErrors = {}, outputElement = document.createElement('div'), styleElement = document.createElement('style'), minimizeToggleId = 'fuse-box-toggle-minimized', hideButtonId = 'fuse-box-hide', expandedOutputClass = 'fuse-box-expanded-output', localStoragePrefix = '__fuse-box_';
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === 'true' ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = 'fuse-box-output';
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, '<br>')
                .replace(/\t/g, '&nbsp;&nbps;&npbs;&nbps;')
                .replace(/ /g, '&nbsp;');
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join('');
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? 'Expand' : 'Minimize') + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? '' : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri,
    });
    client.connect();
    client.on('page-reload', function (data) {
        return window.location.reload();
    });
    client.on('page-hmr', function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === 'string') {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on('source-changed', function (data) {
        console.info("%cupdate \"" + data.path + "\"", 'color: #237abe');
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, '').replace(/[\.\/]+/g, '-');
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement('link');
                node.id = fileId;
                node.type = 'text/css';
                node.rel = 'stylesheet';
                node.href = data.path;
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
        if (data.type === 'js' || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === 'string') {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on('error', function (error) {
        console.log(error);
    });
    client.on('bundle-error', function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on('update-bundle-errors', function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require('events');
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
        var domain = location.hostname || 'localhost';
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit('reconnect', { message: 'Trying to reconnect' });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log('%cConnecting to fusebox HMR at ' + this.url, 'color: #237abe');
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit('error', data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log('%cConnected', 'color: #237abe');
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: 'Socket error' });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit('close', { message: 'Socket closed' });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit('*', item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.import("fusebox-hot-reload").connect(4444, "ws://localhost:8081", true)
FuseBox.defaultPackageName = "aurelia-media-manager";
})
((function(__root__){
if (__root__["FuseBox"]) return __root__["FuseBox"];
var $isServiceWorker = typeof ServiceWorkerGlobalScope !== "undefined";
var $isWebWorker = typeof WorkerGlobalScope !== "undefined";
var $isBrowser = typeof window !== "undefined" && typeof window.navigator !== "undefined" || $isWebWorker || $isServiceWorker;
var g = $isBrowser ? (($isWebWorker || $isServiceWorker) ? {} : window) : global;
if ($isBrowser) {
    g["global"] = ($isWebWorker || $isServiceWorker) ? {} : window;
}
__root__ = !$isBrowser || typeof __fbx__dnm__ !== "undefined" ? module.exports : __root__;
var $fsbx = $isBrowser ? ($isWebWorker || $isServiceWorker) ? {} : (window["__fsbx__"] = window["__fsbx__"] || {})
    : g["$fsbx"] = g["$fsbx"] || {};
if (!$isBrowser) {
    g["require"] = require;
}
var $packages = $fsbx.p = $fsbx.p || {};
var $events = $fsbx.e = $fsbx.e || {};
function $getNodeModuleName(name) {
    var n = name.charCodeAt(0);
    var s = name.charCodeAt(1);
    if (!$isBrowser && s === 58) {
        return;
    }
    if (n >= 97 && n <= 122 || n === 64) {
        if (n === 64) {
            var s_1 = name.split("/");
            var target = s_1.splice(2, s_1.length).join("/");
            return [s_1[0] + "/" + s_1[1], target || undefined];
        }
        var index = name.indexOf("/");
        if (index === -1) {
            return [name];
        }
        var first = name.substring(0, index);
        var second = name.substring(index + 1);
        return [first, second];
    }
}
;
function $getDir(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/")) || "./";
}
;
function $pathJoin() {
    var string = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        string[_i] = arguments[_i];
    }
    var parts = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
        parts = parts.concat(arguments[i].split("/"));
    }
    var newParts = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        if (!part || part === ".")
            continue;
        if (part === "..") {
            newParts.pop();
        }
        else {
            newParts.push(part);
        }
    }
    if (parts[0] === "")
        newParts.unshift("");
    return newParts.join("/") || (newParts.length ? "/" : ".");
}
;
function $ensureExtension(name) {
    var matched = name.match(/\.(\w{1,})$/);
    if (matched) {
        if (!matched[1]) {
            return name + ".js";
        }
        return name;
    }
    return name + ".js";
}
;
function $loadURL(url) {
    if ($isBrowser) {
        var d = document;
        var head = d.getElementsByTagName("head")[0];
        var target;
        if (/\.css$/.test(url)) {
            target = d.createElement("link");
            target.rel = "stylesheet";
            target.type = "text/css";
            target.href = url;
        }
        else {
            target = d.createElement("script");
            target.type = "text/javascript";
            target.src = url;
            target.async = true;
        }
        head.insertBefore(target, head.firstChild);
    }
}
;
function $loopObjKey(obj, func) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            func(key, obj[key]);
        }
    }
}
;
function $serverRequire(path) {
    return { server: require(path) };
}
;
function $getRef(name, o) {
    var basePath = o.path || "./";
    var pkgName = o.pkg || "default";
    var nodeModule = $getNodeModuleName(name);
    if (nodeModule) {
        basePath = "./";
        pkgName = nodeModule[0];
        if (o.v && o.v[pkgName]) {
            pkgName = pkgName + "@" + o.v[pkgName];
        }
        name = nodeModule[1];
    }
    if (name) {
        if (name.charCodeAt(0) === 126) {
            name = name.slice(2, name.length);
            basePath = "./";
        }
        else {
            if (!$isBrowser && (name.charCodeAt(0) === 47 || name.charCodeAt(1) === 58)) {
                return $serverRequire(name);
            }
        }
    }
    var pkg = $packages[pkgName];
    if (!pkg) {
        if ($isBrowser && FuseBox.target !== "electron") {
            throw "Package not found " + pkgName;
        }
        else {
            return $serverRequire(pkgName + (name ? "/" + name : ""));
        }
    }
    name = name ? name : "./" + pkg.s.entry;
    var filePath = $pathJoin(basePath, name);
    var validPath = $ensureExtension(filePath);
    var file = pkg.f[validPath];
    var wildcard;
    if (!file && validPath.indexOf("*") > -1) {
        wildcard = validPath;
    }
    if (!file && !wildcard) {
        validPath = $pathJoin(filePath, "/", "index.js");
        file = pkg.f[validPath];
        if (!file && filePath === ".") {
            validPath = pkg.s && pkg.s.entry || "index.js";
            file = pkg.f[validPath];
        }
        if (!file) {
            validPath = filePath + ".js";
            file = pkg.f[validPath];
        }
        if (!file) {
            file = pkg.f[filePath + ".jsx"];
        }
        if (!file) {
            validPath = filePath + "/index.jsx";
            file = pkg.f[validPath];
        }
    }
    return {
        file: file,
        wildcard: wildcard,
        pkgName: pkgName,
        versions: pkg.v,
        filePath: filePath,
        validPath: validPath,
    };
}
;
function $async(file, cb, o) {
    if (o === void 0) { o = {}; }
    if ($isBrowser) {
        if (o && o.ajaxed === file) {
            return console.error(file, 'does not provide a module');
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var contentType = xmlhttp.getResponseHeader("Content-Type");
                    var content = xmlhttp.responseText;
                    if (/json/.test(contentType)) {
                        content = "module.exports = " + content;
                    }
                    else {
                        if (!/javascript/.test(contentType)) {
                            content = "module.exports = " + JSON.stringify(content);
                        }
                    }
                    var normalized = $pathJoin("./", file);
                    FuseBox.dynamic(normalized, content);
                    cb(FuseBox.import(file, { ajaxed: file }));
                }
                else {
                    console.error(file, 'not found on request');
                    cb(undefined);
                }
            }
        };
        xmlhttp.open("GET", file, true);
        xmlhttp.send();
    }
    else {
        if (/\.(js|json)$/.test(file))
            return cb(g["require"](file));
        return cb("");
    }
}
;
function $trigger(name, args) {
    var e = $events[name];
    if (e) {
        for (var i in e) {
            var res = e[i].apply(null, args);
            if (res === false) {
                return false;
            }
        }
        ;
    }
}
;
function syntheticDefaultExportPolyfill(input) {
    return input !== null && ['function', 'object', 'array']
        .indexOf(typeof input) > -1 && input.default === undefined ?
        Object.isFrozen(input) ? input.default = input : Object.defineProperty(input, "default", { value: input, writable: true, enumerable: false }) : void 0;
}
function $import(name, o) {
    if (o === void 0) { o = {}; }
    if (name.charCodeAt(4) === 58 || name.charCodeAt(5) === 58) {
        return $loadURL(name);
    }
    var ref = $getRef(name, o);
    if (ref.server) {
        return ref.server;
    }
    var file = ref.file;
    if (ref.wildcard) {
        var safeRegEx = new RegExp(ref.wildcard
            .replace(/\*/g, "@")
            .replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
            .replace(/@@/g, ".*")
            .replace(/@/g, "[a-z0-9$_-]+"), "i");
        var pkg_1 = $packages[ref.pkgName];
        if (pkg_1) {
            var batch = {};
            for (var n in pkg_1.f) {
                if (safeRegEx.test(n)) {
                    batch[n] = $import(ref.pkgName + "/" + n);
                }
            }
            return batch;
        }
    }
    if (!file) {
        var asyncMode_1 = typeof o === "function";
        var processStopped = $trigger("async", [name, o]);
        if (processStopped === false) {
            return;
        }
        return $async(name, function (result) { return asyncMode_1 ? o(result) : null; }, o);
    }
    var pkg = ref.pkgName;
    if (file.locals && file.locals.module)
        return file.locals.module.exports;
    var locals = file.locals = {};
    var path = $getDir(ref.validPath);
    locals.exports = {};
    locals.module = { exports: locals.exports };
    locals.require = function (name, optionalCallback) {
        var result = $import(name, {
            pkg: pkg,
            path: path,
            v: ref.versions,
        });
        if (FuseBox["sdep"]) {
            syntheticDefaultExportPolyfill(result);
        }
        return result;
    };
    if ($isBrowser || !g["require"].main) {
        locals.require.main = { filename: "./", paths: [] };
    }
    else {
        locals.require.main = g["require"].main;
    }
    var args = [locals.module.exports, locals.require, locals.module, ref.validPath, path, pkg];
    $trigger("before-import", args);
    file.fn.apply(args[0], args);
    $trigger("after-import", args);
    return locals.module.exports;
}
;
var FuseBox = (function () {
    function FuseBox() {
    }
    FuseBox.global = function (key, obj) {
        if (obj === undefined)
            return g[key];
        g[key] = obj;
    };
    FuseBox.import = function (name, o) {
        return $import(name, o);
    };
    FuseBox.on = function (n, fn) {
        $events[n] = $events[n] || [];
        $events[n].push(fn);
    };
    FuseBox.exists = function (path) {
        try {
            var ref = $getRef(path, {});
            return ref.file !== undefined;
        }
        catch (err) {
            return false;
        }
    };
    FuseBox.remove = function (path) {
        var ref = $getRef(path, {});
        var pkg = $packages[ref.pkgName];
        if (pkg && pkg.f[ref.validPath]) {
            delete pkg.f[ref.validPath];
        }
    };
    FuseBox.main = function (name) {
        this.mainFile = name;
        return FuseBox.import(name, {});
    };
    FuseBox.expose = function (obj) {
        var _loop_1 = function (k) {
            var alias = obj[k].alias;
            var xp = $import(obj[k].pkg);
            if (alias === "*") {
                $loopObjKey(xp, function (exportKey, value) { return __root__[exportKey] = value; });
            }
            else if (typeof alias === "object") {
                $loopObjKey(alias, function (exportKey, value) { return __root__[value] = xp[exportKey]; });
            }
            else {
                __root__[alias] = xp;
            }
        };
        for (var k in obj) {
            _loop_1(k);
        }
    };
    FuseBox.dynamic = function (path, str, opts) {
        this.pkg(opts && opts.pkg || "default", {}, function (___scope___) {
            ___scope___.file(path, function (exports, require, module, __filename, __dirname) {
                var res = new Function("__fbx__dnm__", "exports", "require", "module", "__filename", "__dirname", "__root__", str);
                res(true, exports, require, module, __filename, __dirname, __root__);
            });
        });
    };
    FuseBox.flush = function (shouldFlush) {
        var def = $packages["default"];
        for (var fileName in def.f) {
            if (!shouldFlush || shouldFlush(fileName)) {
                delete def.f[fileName].locals;
            }
        }
    };
    FuseBox.pkg = function (name, v, fn) {
        if ($packages[name])
            return fn($packages[name].s);
        var pkg = $packages[name] = {};
        pkg.f = {};
        pkg.v = v;
        pkg.s = {
            file: function (name, fn) { return pkg.f[name] = { fn: fn }; },
        };
        return fn(pkg.s);
    };
    FuseBox.addPlugin = function (plugin) {
        this.plugins.push(plugin);
    };
    FuseBox.packages = $packages;
    FuseBox.isBrowser = $isBrowser;
    FuseBox.isServer = !$isBrowser;
    FuseBox.plugins = [];
    return FuseBox;
}());
if (!$isBrowser) {
    g["FuseBox"] = FuseBox;
}

return __root__["FuseBox"] = FuseBox; } )(this))
//# sourceMappingURL=aurelia-media-manager.js.map