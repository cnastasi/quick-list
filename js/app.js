var app = angular.module("FirefoxOSApp", []);

app.controller("TodoController",function($scope){
   $scope.todos = [
    {
      text:'learn angular', 
      done:true
    },{
      text:'build an angular app', 
      done:false
    }];
     
    $scope.addTodo = function() {
      $scope.todos.push({text:$scope.todoText, done:false});
      $scope.todoText = '';
    };
    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
    
    $scope.deleteTodo = function($index) {
      console.log($index);
      $scope.todos.splice($index,1);
    };

});