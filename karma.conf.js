module.exports = function(config) {
    config.set({

        basePath: '',
        // frameworks to use
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-local-storage/dist/angular-local-storage.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/**/*.js',
            'test/unit/**/*.js'
        ],

        reporters: ['progress'],

        port: 9876,

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS']

    });
};