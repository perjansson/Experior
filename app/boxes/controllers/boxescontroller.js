app.controller('BoxesController', ['$scope', 'Box', 'Statistic', 'direction', 'localStorageService', '$routeParams', function ($scope, Box, Statistic, directions, localStorageService, $routeParams) {

    $scope.addBoxAtIndex = function (index) {
        $scope.statistic.numberOfBoxesCreatedInTotal++;
        $scope.statistic.numberOfBoxesCreatedInSession++;
        var newBox = new Box($scope.statistic.numberOfBoxesCreatedInTotal);
        $scope.boxes.splice(index, 0, newBox);
        $scope.statistic.lastActionMessage = "You added box " + newBox.id;
        saveToLocalStorage($scope.boxes, $scope.statistic);
    };

    $scope.removeBoxAtIndex = function (index) {
        $scope.statistic.numberOfBoxesDeletedInSession++;
        var removedBoxes = $scope.boxes.splice(index, 1);
        $scope.statistic.lastActionMessage = "You removed box " + removedBoxes[0].id;
        saveToLocalStorage($scope.boxes, $scope.statistic);
    };

    $scope.findNeighbourOfBox = function (boxIndex, boxes, direction) {
        if (direction === directions.west && canHaveNeighbourOnWestSide(boxIndex)) {
            return boxes[boxIndex - 1];
        } else if (direction === directions.east && canHaveNeighbourOnEastSide(boxIndex)) {
            return boxes[boxIndex + 1];
        }
    };

    function canHaveNeighbourOnWestSide(boxIndex) {
        var nonZeroBasedBoxIndex = boxIndex + 1;
        return nonZeroBasedBoxIndex % 6 != 1 && nonZeroBasedBoxIndex % 6 != 4 && nonZeroBasedBoxIndex % 6 != 0;
    }

    function canHaveNeighbourOnEastSide(boxIndex) {
        var nonZeroBasedBoxIndex = boxIndex + 1;
        return nonZeroBasedBoxIndex % 6 != 3 && nonZeroBasedBoxIndex % 6 != 5 && nonZeroBasedBoxIndex % 6 != 0;
    }

    function saveToLocalStorage(boxes, statistic) {
        if (localStorageService.isSupported) {
            localStorageService.set("boxes", boxes);
            localStorageService.set("statistic", statistic);
        }
    }

    /* According to Mr Johnson the only application state needed to be restored is the number of boxes created in total */
    $scope.statistic = localStorageService.get("statistic") || new Statistic();
    $scope.statistic.numberOfBoxesCreatedInSession = 0;
    $scope.statistic.numberOfBoxesDeletedInSession = 0;
    $scope.statistic.lastActionMessage = null;

    $scope.boxes = localStorageService.get("boxes") || [];
    if ($scope.boxes.length == 0) {
        $scope.addBoxAtIndex(0);
    }

}]);