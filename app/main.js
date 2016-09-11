/**
 * Created by mainhackintosh on 9/10/16.
 */
angular.module('addressBook',[])
   .service('contactService', function($http) {
      this.contacts = [];

      var contactService = this;

      $http.get('http://localhost:9001/contacts').then(function(response) {
         for (var i=0; i< response.data.length; i++) {
            contactService.contacts.push(response.data[i]);
         }
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
   .directive('chart', function() {
      return {
         restrict : 'E',
         controllerAs : 'ctrl',
         scope: {
            data: '<'
         },
         controller: function($scope) {
            // set the dimensions and margins of the graph
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
               width = 960 - margin.left - margin.right,
               height = 500 - margin.top - margin.bottom;

            // set the ranges
            var x = d3.scaleBand()
               .range([0, width])
               .padding(0.1);
            var y = d3.scaleLinear()
               .range([height, 0]);

            // append the svg object to the body of the page
            // append a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select("body").append("svg")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
               .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

            // get the data
            var data = $scope.data;

            // Scale the range of the data in the domains
            x.domain(data.map(function(d) { return d.letter; }));
            y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

            // append the rectangles for the bar chart
            svg.selectAll(".bar")
               .data(data)
               .enter().append("rect")
               .attr("class", "bar")
               .attr("x", function(d) { return x(d.letter); })
               .attr("width", x.bandwidth())
               .attr("y", function(d) { return y(d.frequency); })
               .attr("height", function(d) { return height - y(d.frequency); });

            // add the x Axis
            svg.append("g")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(x));

            // add the y Axis
            svg.append("g")
               .call(d3.axisLeft(y));
         },
         template: '<div class="chart"></div>'
      };
   })
;

