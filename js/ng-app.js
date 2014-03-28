var app = angular.module("app", [])

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'HomeController'
  });
  
  $routeProvider.when('/search',{
    templateUrl:'search.html',
    controller: 'SearchController'
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

});

app.factory("AuthenticationService", function($location,$rootScope) {
  $rootScope.credentials = {};
  return {
    login: function(credentials) {
      if (credentials.username !== "admin" || credentials.password !== "adminpwd") {
        alert("Username must be 'admin', password must be 'adminpwd'");
      } else {
        $location.path('/home');
      }
    },
    logout: function() {
      $location.path('/login');
    }
  };
});

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

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials);
  }
});

app.controller("HomeController", function($scope, AuthenticationService) {
  $scope.title = "Awesome Home";
  $scope.message = "Mouse Over these images to see a directive at work!";

  $scope.logout = function() {
    AuthenticationService.logout();
  };
});

app.controller("SearchController",function($scope,DataService){
  //console.log(DataService.all());
  $scope.users = DataService.all();
  $scope.order = 'firstName';
  $scope.convertAge = false;
  $scope.setOrder = function(order){
    if(order == $scope.order){
      $scope.order = '-'+order;
    }else{
      $scope.order = order;
    }
  };
  
  $scope.convert = function(){
    $scope.convertAge = !$scope.convertAge;
  };
/*  
  $scope.$watch('convertAge',function(convertAge){
    console.log(convertAge);
  });
*/

});
app.directive("showsMessageWhenHovered", function() {
  return {
    restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
    link: function(scope, element, attributes) {
      var originalMessage = scope.message;
      element.bind("mouseenter", function() {
        scope.message = attributes.message;
        scope.$apply();
      });
      element.bind("mouseleave", function() {
        scope.message = originalMessage;
        scope.$apply();
      });
    }
  };
});

app.directive("colorChange",function(){
  return{
    restrict: "A",
    link: function(scope,element,attributes){
      scope.$watch('order',function(order){
          if(order == attributes.colorChange){
            element.addClass('orderAsc');
          }else if(order == '-'+attributes.colorChange){
            element.addClass('orderDesc');
          }else{
            element.removeClass('orderDesc').removeClass('orderAsc');
          }
      });
    }
  };
});
//secondo metodo
app.directive("convertAge",function(){
  return{
    restrict: "A",
    scope:{
      birth : '@convertAge',
      convertAge : '=convert'
    },
    link: function(scope,element,attributes){
      var currentYear = new Date().getFullYear();
      scope.$watch('convertAge',function(convertAge){
        console.log(convertAge);
        if(convertAge){
          element.text(currentYear - scope.birth);
        }else{
          element.text(scope.birth);
        }  
      });
      
    }
  };
});
//primo metodo
app.filter("age",function(){
  return function(birth,convertAge){
    var currentYear = new Date().getFullYear();
    if(convertAge){
      return currentYear - birth;
    }
      return birth;
  };
});
