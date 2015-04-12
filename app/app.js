var app = angular.module('ExperiorApp', ['ngRoute', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('ExperiorApp')
        .setStorageType('localStorage')
        .setNotify(true, true)
});