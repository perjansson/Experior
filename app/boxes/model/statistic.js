app.factory('Statistic', function () {
    function Statistic() {
        this.numberOfBoxesCreatedInTotal = 0;
        this.numberOfBoxesCreatedInSession = 0;
        this.numberOfBoxesDeletedInSession = 0;
        this.lastActionMessage = null;
    };
    return Statistic;
});