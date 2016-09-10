/**
 * Created by mainhackintosh on 9/10/16.
 */
angular.module('addressBook',[])
   .service('contactService', function($http) {
      this.contacts = [];

      var contactService = this;

      $http.get('http://localhost:9001/contacts').then(function(response) {
         console.log(response);
         for (var i=0; i< response.data.length; i++) {
            contactService.contacts.push(response.data[i]);
         }
         console.log(contactService.contacts);
      });
   })
   .controller('contactController', function(contactService, $scope) {
      $scope.contacts = contactService.contacts;
      console.log($scope.contacts);
   })
   .filter('properCase', function() {
      return function(name) {
        var type = typeof name;
         if (type !== 'string') {
            throw new Error();
         }

         return name.split(' ').map(function(word) {
            return word[0].toUpperCase().concat(word.slice(1));
         }).join(' ');
      };
   })
   .directive('avatar', function() {
      return {
        restrict : 'AE',
         scope: {
            name: '='
         },
         template: '<span class="avatar">{{ name[0] | properCase}}</span>'
      };
   })
;

