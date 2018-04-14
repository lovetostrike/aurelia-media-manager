System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var uploadFiles;
    return {
        setters: [],
        execute: function () {
            uploadFiles = function (files, handlers) {
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
            exports_1("uploadFiles", uploadFiles);
        }
    };
});
