/**
 * Would like to use this from boxes.html to determine the column sizes, but I haven't got it to work when the list changes the directives for existing boxes aren't evaluated again.
 */
app.directive('pjBoxSize', function () {
    return {
        restrict: 'A',
        scope: {
            changevalue: '=',
            index: '@'
        },
        link: function (scope, elem, attrs) {
            scope.$watch('changevalue', function (newValue, oldValue) {
                var nonZeroBasedBoxIndex = parseInt(scope.index) + 1;
                elem.removeClass('col-xs-4 col-xs-6 col-xs-12')
                if (nonZeroBasedBoxIndex % 6 == 1 || nonZeroBasedBoxIndex % 6 == 2 || nonZeroBasedBoxIndex % 6 == 3) {
                    elem.addClass('col-xs-4');
                } else if (nonZeroBasedBoxIndex % 6 == 4 || nonZeroBasedBoxIndex % 6 == 5) {
                    elem.addClass('col-xs-6');
                } else if (nonZeroBasedBoxIndex % 6 == 0) {
                    elem.addClass('col-xs-12');
                }
            });
        }
    }
})