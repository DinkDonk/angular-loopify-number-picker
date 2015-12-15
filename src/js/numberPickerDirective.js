module.directive('numberPicker', ['numberPickerService', function (numberPickerService) {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            min: '@',
            max: '@',
            step: '@',
            enter: '@',
            percent: '@',
            label: '@',
            methodRound: '@'
        },
        templateUrl: 'templates/numberPicker/numberPicker.html',
        link: function (scope, element, attrs) {
            // var scope = numberPickerService.assignExtend(scope, config);
            if (!numberPickerService.checkNumber([scope.min, scope.max, scope.step])) {
                throw new Error('some value: (min, max or step) is not a valid number');
            }

            if (scope.percent) {
                scope.percentLabel = '%';
                scope.isPercent = true;
            }

            scope.id = numberPickerService.getId();

            scope.incrementValue = function () {
                if (scope.value >= (scope.isPercent ? 100 : Number(scope.max))) {
                    return;
                }

                scope.value += Number(scope.step);
            };

            scope.decrementValue = function () {
                if (scope.value <= (scope.isPercent ? 0 : Number(scope.min))) {
                    return;
                }

                scope.value -= Number(scope.step);
            };

            scope.togglePercentageValue = function () {
                scope.isPercent = !scope.isPercent;

                if (scope.isPercent) {
                    scope.percentLabel = '%';
                } else {
                    scope.percentLabel = scope.label;
                }
            };

            //watch for disabled buttons
            scope.$watch('value', function (newValue, oldValue) {
                newValue = Number(newValue);
                var min = scope.isPercent ? 0 : Number(scope.min);
                var max = scope.isPercent ? 100 : Number(scope.max);

                scope.canDown = newValue > min;
                scope.canUp = newValue < max;
                scope.isMaxValue = !scope.canUp;
                scope.isMinValue = !scope.canDown;

                if (!numberPickerService.checkNumber(newValue) || newValue > max || newValue < min) {
                    //set oldValue or min value if oldValue isn't number when newValue isn't a number or newValue more than max or newValue less than min
                    scope.value = numberPickerService.checkNumber(oldValue) ? oldValue : scope.min;
                }
            });

            scope.$watch('percentLabel', function (newValue, oldValue) {
                if (!newValue && !oldValue) {
                    return false;
                }

                var value = Number(scope.value);
                var min = Number(scope.min);
                var max = Number(scope.max);

                if (scope.isPercent) {
                    scope.value = scope.methodRound ? Math[scope.methodRound](value / max * 100) : value / max * 100;
                } else {
                    scope.value = scope.methodRound ? Math[scope.methodRound](max * value / 100) : max * value / 100;
                }
            });
        }
    };
}]);