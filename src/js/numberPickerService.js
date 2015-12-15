module.factory('numberPickerService', [function () {
    return {
        index: 0,
        isNumber: function (value) {
            var val = Number(value);
            return !isNaN(val) && val === +value;
        },
        checkNumber: function (value) {
            var self = this,
            //count no numbers
                cnn = 0;

            if (angular.isArray(value)) {
                angular.forEach(value, function (v) {
                    if (!self.isNumber(v)) {
                        cnn += 1;
                    }
                });
                if (cnn > 0) {
                    return false;
                }
                return true;
            }
            if (!this.isNumber(value)) {
                return false;
            }
            return true;
        },
        getId: function () {
            this.index += 1;
            return 'number-picker-' + this.index;
        }
    };
}]);