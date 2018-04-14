System.register(["../../services/config-service", "aurelia-framework", "../../lib/file-upload"], function (exports_1, context_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var config_service_1, aurelia_framework_1, file_upload_1, DragAndDrop;
    return {
        setters: [
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (file_upload_1_1) {
                file_upload_1 = file_upload_1_1;
            }
        ],
        execute: function () {
            DragAndDrop = (function () {
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
                    __metadata("design:type", Array)
                ], DragAndDrop.prototype, "fileTypes", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", Function)
                ], DragAndDrop.prototype, "abort", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", Boolean)
                ], DragAndDrop.prototype, "multiple", void 0);
                DragAndDrop = __decorate([
                    aurelia_framework_1.autoinject,
                    __metadata("design:paramtypes", [config_service_1.ConfigService])
                ], DragAndDrop);
                return DragAndDrop;
            }());
            exports_1("DragAndDrop", DragAndDrop);
        }
    };
});
