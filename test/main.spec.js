/**
 * Created by mainhackintosh on 9/10/16.
 */
var assert = chai.assert;
var expect = chai.expect;

describe('The address book app', function() {
   describe('the contact service', function() {
      var contactService;
      var $httpBackend;

      beforeEach(function() {
         module('addressBook');
         inject(function($injector) {
            contactService = $injector.get('contactService');
            $httpBackend = $injector.get('$httpBackend');
         });
      });

      it('should have a contacts property as an array', function() {
         expect(contactService.contacts).to.be.an('array');
      });

      it('should call the backend', function() {
         $httpBackend
            .expectGET('http://localhost:9001/contacts')
            .respond(200, []);
         $httpBackend.flush();
      });
   });
});