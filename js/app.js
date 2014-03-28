var app = angular.module("quicklist", []);

app.config(function($routeProvider) {

  $routeProvider.when('/home', {
    templateUrl: 'index.html',
    controller: 'TodoController'
  });

  $routeProvider.when('/map', {
    templateUrl: 'map.html',
    controller: 'MapController'
  });
  

  $routeProvider.otherwise({ redirectTo: '/login' });

});

app.factory("StorageService",function(){
  return{
    set: function(key,value){
        localStorage[key] = JSON.stringify(value);
    },
    get: function(key){
      if(localStorage[key])
        return JSON.parse(localStorage[key]);
      else
        throw "invalid key " + key; 
    },
    remove: function(key){
      if(localStorage[key])
        delete localStorage[key];
      else
        throw "invalid key " + key;
    }
  };
});

app.factory("TodoListService",function(StorageService){
  return{
    save: function(data){
        list = [];

        for (index in data) {
          list.push ({
            text: data[index].text,
            done: data[index].done
          });
        }

        StorageService.set("TodoList", list);
    },
    load: function(){
        return StorageService.get("TodoList");
    }
  };
});

app.controller("TodoController",function($scope,TodoListService, GeolocalizationService) {
    try{
      $scope.todos = TodoListService.load();
    }
    catch(error){
      $scope.todos = [{text:'Fire',done:true}];
    }
    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.text, done:false, type:"text"});
      $scope.text = '';
      TodoListService.save($scope.todos);
    };

    $scope.geolocalize = function () {
        GeolocalizationService.getPosition (function (position){
            //console.log (position);
            //alert('Lat: ' + position.coords.latitude + ' Long: ' + position.coords.longitude);
            //url = "https://www.google.it/maps?t=m&ll=" + position.coords.latitude + "," + position.coords.longitude + "&z=20&output=classic";

            text = 'Lat: ' + position.coords.latitude + ' Long: ' + position.coords.longitude;

            $scope.todos.push({text: text, done: false, type:'location'}); 
            $scope.$apply();

            TodoListService.save($scope.todos);
        }, 
        function ()  {
          alert("Error!");
        });
    };

    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
      TodoListService.save($scope.todos);
    };

    $scope.deleteTodo = function($index) {
      console.log($index);
      $scope.todos.splice($index,1);
      TodoListService.save($scope.todos);
    };

});

app.controller("MapController",function($scope))