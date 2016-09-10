/**
 * Created by mainhackintosh on 9/10/16.
 */
angular.module('addressBook',[])
   .service('contactService', function($http) {
      this.contacts = [];

      $http.get('http://localhost:9001/contacts', function(data) {
         console.log(data);
      });
   });
