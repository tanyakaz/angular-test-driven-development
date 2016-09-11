/**
 * Created by mainhackintosh on 9/10/16.
 */
module.exports = function(config) {
   config.set({
      browsers: ['Chrome'],
      frameworks: ['mocha'],
      preprocessors: {
         'app/**/*.js': ['coverage']
      },
      coverageReporter: {
         includeAllSources: true,
         reporters: [{
            type: 'text'
         }, {
            type: 'html',
            dir: 'test/coverage',
            subdir: '.'
         }]
      },
      files: [
         'bower_components/angular/angular.js',
         'bower_components/angular-mocks/angular-mocks.js',
         'bower_components/chai/chai.js',
         'bower_components/d3/d3.js',
         'bower_components/jquery/dist/jquery.js',
         'bower_components/chai-jquery/chai-jquery.js',
         'app/**/*.js',
         'test/*.spec.js'
      ]
   });
};