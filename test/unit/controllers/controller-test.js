describe('App Controllers', function () {

    beforeEach(angular.mock.module('ExperiorApp'));

    describe('BoxesController', function () {

        var boxes;
        var scope;
        var controller;

        before(function (done) {
            boxes = ['Test box 1', 'Test box 2', "Test box 3", 'Test box 4', "Test box 5", 'Test box 6', 'Test box 7', "Test box 8"];
            scope = {};
            done();
        });

        it('should add one box with id 1 when creating the controller the first time', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});

            // when
            var numberOfBoxes = scope.boxes.length;

            // then
            expect(numberOfBoxes).to.be.equal(1);
        }));

        it('should add box at correct index', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});
            scope.addBoxAtIndex(1);
            scope.addBoxAtIndex(1);

            // when
            var numberOfBoxes = scope.boxes.length;
            var boxAtIndex0 = scope.boxes[0];
            var boxAtIndex1 = scope.boxes[1];
            var boxAtIndex2 = scope.boxes[2];

            // then
            expect(numberOfBoxes).to.be.equal(3);
            expect(boxAtIndex0.id).to.be.equal(1);
            expect(boxAtIndex1.id).to.be.equal(3);
            expect(boxAtIndex2.id).to.be.equal(2);
        }));

        it('should find neighbour only on east side of box with index 0', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});

            // when
            var neighbourOnWest = scope.findNeighbourOfBox(0, boxes, "west");
            var neighbourOnEast = scope.findNeighbourOfBox(0, boxes, "east");

            // then
            expect(neighbourOnWest).to.be.undefined;
            expect(neighbourOnEast).to.be.equal('Test box 2');
        }));

        it('should find a neighbour on both on west and east side of box with index 1', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});

            // when
            var neighbourOnWest = scope.findNeighbourOfBox(1, boxes, "west");
            var neighbourOnEast = scope.findNeighbourOfBox(1, boxes, "east");

            // then
            expect(neighbourOnWest).to.be.equal('Test box 1');
            expect(neighbourOnEast).to.be.equal('Test box 3');
        }));

        it('should find neighbour only on west side of box with index 2', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});

            // when
            var neighbourOnWest = scope.findNeighbourOfBox(2, boxes, "west");
            var neighbourOnEast = scope.findNeighbourOfBox(2, boxes, "east");

            // then
            expect(neighbourOnWest).to.be.equal('Test box 2');
            expect(neighbourOnEast).to.be.undefined;
        }));

        it('should find neighbour only on east side of box with index 3', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});

            // when
            var neighbourOnWest = scope.findNeighbourOfBox(3, boxes, "west");
            var neighbourOnEast = scope.findNeighbourOfBox(3, boxes, "east");

            // then
            expect(neighbourOnWest).to.be.undefined;
            expect(neighbourOnEast).to.be.equal('Test box 5');
        }));

        it('should find neighbour only on west side of box with index 4', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});

            // when
            var neighbourOnWest = scope.findNeighbourOfBox(4, boxes, "west");
            var neighbourOnEast = scope.findNeighbourOfBox(4, boxes, "east");

            // then
            expect(neighbourOnWest).to.be.equal('Test box 4');
            expect(neighbourOnEast).to.be.undefined;
        }));

        it('should find neighbour on no side of box with index 5', angular.mock.inject(function ($controller) {
            // given
            $controller('BoxesController', {$scope: scope});

            // when
            var neighbourOnWest = scope.findNeighbourOfBox(5, boxes, "west");
            var neighbourOnEast = scope.findNeighbourOfBox(5, boxes, "east");

            // then
            expect(neighbourOnWest).to.be.undefined;
            expect(neighbourOnEast).to.be.undefined;
        }));

    });

    /* More UT:s would be here if time permitted it :) */
});