(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("aurelia-skeleton-plugin-typescript", {}, function(___scope___){
___scope___.file("resources/elements/drag-and-drop.html", function(exports, require, module, __filename, __dirname){

module.exports.default =  "<template>\n  <require from='./drag-and-drop.scss'></require>\n  <require from='./progress-bar.html'></require>\n\n  <h2 show.bind='uploads.length'>Uploads</h2>\n  <ul show.bind='uploads.length' class='uploads'>\n    <li repeat.for='upload of uploads'>\n      <div class='file-info'>\n        <div class='file-attributes'>\n          ${upload.file.name} - ${upload.file.size} - ${upload.file.type}\n        </div>\n        <div if.bind='upload.progress === 100 && !upload.cancelled' class='icon complete-btn'></div>\n        <div if.bind='upload.cancelled' class='error'>CANCELLED</div>\n      </div>\n      <div class='progress-container' if.bind='upload.progress !== 100 && !upload.cancelled'>\n        <progress-bar percentage.bind='upload.progress'></progress-bar>\n        <span class='icon btn cancel-btn' click.delegate='abortUpload($index)'></span>\n      </div>\n    </li>\n  </ul>\n\n  <label for.one-time='id' tr='uploadMedia'>\n    <div\n      drop.delegate='handleDrop($event)'\n      dragover.delegate='$event.preventDefault()'\n      class='upload-controls'\n    >\n      <div class='upload-icon'></div>\n      <div>Drag files here or click here to upload</div>\n  </label>\n\n  <input\n    type='file'\n    id.one-time='id'\n    accept.one-time='fileTypes.join()'\n    change.delegate='handleInputChange($event)'\n    multiple.one-time='multiple'\n  />\n</template>\n"
});
___scope___.file("resources/elements/progress-bar.html", function(exports, require, module, __filename, __dirname){

module.exports.default =  "<template bindable='percentage'>\n  <require from='./progress-bar.scss'></require>\n\n  <div class='progress'>\n    <span class='text'>${percentage}%</span>\n    <div class='meter' css='width: ${percentage}%'></div>\n  </div>\n</template>\n"
});
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

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
//# sourceMappingURL=index.js.map
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
return ___scope___.entry = "index.js";
});
FuseBox.target = "universal"
FuseBox.defaultPackageName = "aurelia-skeleton-plugin-typescript";
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((p||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),u=e.substring(o+1);return[a,u]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(p){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function u(e){return{server:require(e)}}function f(e,n){var o=n.path||"./",a=n.pkg||"default",f=r(e);if(f&&(o="./",a=f[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=f[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!p&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return u(e);var s=g[a];if(!s){if(p&&"electron"!==x.target)throw"Package not found "+a;return u(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,c=t(o,e),d=i(c),v=s.f[d];return!v&&d.indexOf("*")>-1&&(l=d),v||l||(d=t(c,"/","index.js"),v=s.f[d],v||"."!==c||(d=s.s&&s.s.entry||"index.js",v=s.f[d]),v||(d=c+".js",v=s.f[d]),v||(v=s.f[c+".jsx"]),v||(d=c+"/index.jsx",v=s.f[d])),{file:v,wildcard:l,pkgName:a,versions:s.v,filePath:c,validPath:d}}function s(e,r,n){if(void 0===n&&(n={}),!p)return r(/\.(js|json)$/.test(e)?v.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);x.dynamic(a,o),r(x.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=h[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=f(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=g[t.pkgName];if(u){var d={};for(var m in u.f)a.test(m)&&(d[m]=c(t.pkgName+"/"+m));return d}}if(!i){var h="function"==typeof r,x=l("async",[e,r]);if(x===!1)return;return s(e,function(e){return h?r(e):null},r)}var _=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var y=i.locals={},w=n(t.validPath);y.exports={},y.module={exports:y.exports},y.require=function(e,r){return c(e,{pkg:_,path:w,v:t.versions})},p||!v.require.main?y.require.main={filename:"./",paths:[]}:y.require.main=v.require.main;var j=[y.module.exports,y.require,y.module,t.validPath,w,_];return l("before-import",j),i.fn.apply(0,j),l("after-import",j),y.module.exports}if(e.FuseBox)return e.FuseBox;var d="undefined"!=typeof WorkerGlobalScope,p="undefined"!=typeof window&&window.navigator||d,v=p?d?{}:window:global;p&&(v.global=d?{}:window),e=p&&"undefined"==typeof __fbx__dnm__?e:module.exports;var m=p?d?{}:window.__fsbx__=window.__fsbx__||{}:v.$fsbx=v.$fsbx||{};p||(v.require=require);var g=m.p=m.p||{},h=m.e=m.e||{},x=function(){function r(){}return r.global=function(e,r){return void 0===r?v[e]:void(v[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){h[e]=h[e]||[],h[e].push(r)},r.exists=function(e){try{var r=f(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=f(e,{}),n=g[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var u=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);u(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=g.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(g[e])return n(g[e].s);var t=g[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=g,r.isBrowser=p,r.isServer=!p,r.plugins=[],r}();return p||(v.FuseBox=x),e.FuseBox=x}(this))
//# sourceMappingURL=aurelia-skeleton-plugin-typescript.js.map