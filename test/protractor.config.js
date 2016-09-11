/**
 * Created by mainhackintosh on 9/10/16.
 */
exports.config = {
   seleniumAddress: 'http://127.0.0.1:4444/wd/hub', // or localhost instead of 127.0.0.1
   capabilities: {
      browserName: 'chrome'
   },
   specs: ['e2e/*.js'],
   jasmineNodeOpts: {
      showColors: true
   }
};