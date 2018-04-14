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
