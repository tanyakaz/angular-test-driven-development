/**
 * Created by mainhackintosh on 9/10/16.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
   browserSync.init({
      notify: false,
      port: 8080,
      server: {
         baseDir: ['app'],
         routes: {
            '/bower-components': 'bower-components'
         }
      }
   });

   gulp.watch(['app/**/*.*']).on('change', browserSync.reload);
});