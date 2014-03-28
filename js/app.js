var app = angular.module("FirefoxOSApp", []);


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

app.factory("TodoListService",function($scope,StorageService){
  return{
    save: function(){
        StorageService.set("TodoList",$scope.todos);
    },
    load: function(){
        StorageService.get("TodoList");
    }
  };
});

app.controller("TodoController",function($scope,TodoListService){
    
    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
      TodoListService.save();
    };

    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
      TodoListService.save();
    };

    $scope.deleteTodo = function($index) {
      console.log($index);
      $scope.todos.splice($index,1);
      TodoListService.save();
    };

});
