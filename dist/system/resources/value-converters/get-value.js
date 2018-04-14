System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var GetValueValueConverter;
    return {
        setters: [],
        execute: function () {
            GetValueValueConverter = (function () {
                function GetValueValueConverter() {
                }
                GetValueValueConverter.prototype.toView = function (value, index) {
                    return value[index];
                };
                return GetValueValueConverter;
            }());
            exports_1("GetValueValueConverter", GetValueValueConverter);
        }
    };
});
