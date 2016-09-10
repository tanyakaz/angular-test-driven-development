/**
 * Created by mainhackintosh on 9/10/16.
 */
module.exports = function(config) {
   config.set({
      browsers: ['PhantomJS'],
      frameworks: ['mocha'],
      files: [
         'bower_components/angular/angular.js',
         'bower_components/angular-mocks/angular-mocks.js',
         'bower_components/chai/chai.js',
         'app/**/*.js',
         'test/*.js'
      ]
   });
};