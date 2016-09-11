/**
 * Created by mainhackintosh on 9/10/16.
 */
var assert = chai.assert;
var expect = chai.expect;

describe('The address book app', function() {
   var contactService;
   var $httpBackend;
   var $scope;
   var $controller;

   describe('the contact service', function() {
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

   describe('the contact controller', function() {
      beforeEach(function() {
         module('addressBook');
         inject(function($injector, $rootScope) {
            $scope = $rootScope.$new();
            contactService = $injector.get('contactService');
            $httpBackend = $injector.get('$httpBackend');
            $controller = $injector.get('$controller');
         });
      });

      it('should store an array of contacts in scope', function() {
         $controller('contactController',{
            $scope: $scope,
            contactService: contactService
         });

         assert.isArray($scope.contacts);
      });
   });

   describe('the proper case filter', function() {
      var properCaseFilter;

      beforeEach(function() {
         module('addressBook');
         inject(function($injector) {
            properCaseFilter = $injector.get('$filter')('properCase')
         });
      });

      it('should proper case a string', function() {
         expect(properCaseFilter('anna maria')).to.equal('Anna Maria');
         expect(properCaseFilter('jesus christ')).to.not.equal('Someone Christ');
      });

      it('should throw an error if passed something other than a string', function() {
         assert.throws(function() {
            properCaseFilter([]);
         });

         assert.throws(function() {
            properCaseFilter(1234);
         });
      });
   });

   describe('avatar', function() {
      beforeEach(function() {
         module('addressBook');
      });

      it('should display the capitalized first letter', function() {
         inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            $scope.contact = { name: 'tatiana campbell'};
            var element = $compile('<avatar name="contact.name"></avatar>')($scope);
            $scope.$digest();

            var dirText = element.text();

            expect(dirText).to.equal('T');
         });
      });
   });

   describe('chart', function() {
      beforeEach(function() {
         module('addressBook');
      });

      it('should generate an SVG with proper number of bars', function() {
         inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            $scope.data = [{
               letter: 'A',
               frequency: 0.7
            }, {
               letter: 'B',
               frequency: 0.5
            }, {
               letter: 'C',
               frequency: 0.6
            }];
            var element = $compile('<chart data="data"></chart>')($scope);
            //$scope.$digest();

            var svg = $('svg');
            var numBars = svg.find('rect').length;
            expect(svg.length).to.equal(1);
            expect(numBars).to.equal(3);
         });
      });
   });
});