var app = angular.module("FirefoxOSApp", []);

app.factory("DataService",function(){
  return{
    all: function(){
      //http request
      return [{
        firstName: 'Marco',
        lastName: 'Predari',
        birth: 1992
      },{
        firstName: 'Daniele',
        lastName: 'Ghidoli',
        birth: 1987
      },{
        firstName: 'Christian',
        lastName: 'Nastasi',
        birth: 1982
      }];
    }
  };
});


app.factory("GazzettaService",function($http){
	return{
		all: function(){
			$http({method: 'GET', url: 'http://www.gazzetta.it/rss/home.xml'}).
			    success(function(data, status, headers, config) {
			    // this callback will be called asynchronously
			    // when the response is available
			    return data;
			    }).
			    error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    });
		}
	};
});

app.controller("SearchController",function($scope,DataService,GazzettaService){
  console.log(DataService.all());
  console.log(GazzettaService.all());
  $scope.users = DataService.all();
  $scope.news = GazzettaService.all();
});