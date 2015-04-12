app.directive('pjBackground', ["$window", function ($window) {

    var alphaSpan = [0.01, 0.85];
    var colorSteps = 0.02;

    return {
        restrict: 'A',
        scope: {
            changevalue: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('changevalue', function (newValue, oldValue) {
                var currentAlpha = getAlpha(element);
                if (newValue.length > oldValue.length) {
                    var newAlpha = currentAlpha + colorSteps;
                    if (newAlpha < alphaSpan[1]) {
                        setAlpha(element, currentAlpha, newAlpha);
                    }
                } else if (newValue.length < oldValue.length) {
                    var newAlpha = currentAlpha - colorSteps;
                    if (newAlpha > alphaSpan[0]) {
                        setAlpha(element, currentAlpha, newAlpha)
                    }
                }

            }, true);
        }
    }

    function getAlpha(element) {
        var currentBackgroundColor = getCurrentBackgroundColor(element);
        if (currentBackgroundColor.substring(0, 4) === 'rgba') {
            var currentBackgroundColorArray = currentBackgroundColor.split(',');
            var alphaRough = currentBackgroundColorArray[currentBackgroundColorArray.length - 1].trim();
            var alpha = alphaRough.substring(0, alphaRough.indexOf(")"));
            return parseFloat(alpha);
        } else {
            return 1;
        }
    }

    function setAlpha(element, currentAlpha, newAlpha) {
        var currentBackgroundColor = getCurrentBackgroundColor(element);
        var newBackgroundColor = currentBackgroundColor.replace(currentAlpha, newAlpha);
        element.css('background-color', newBackgroundColor);
    }

    function getCurrentBackgroundColor(element) {
        return $window.getComputedStyle(element[0], null)["background-color"];
    }
}])