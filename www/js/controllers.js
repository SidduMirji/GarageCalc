

app.controller('DashCtrl', function($scope) {})
    
.controller('CalcCtrl', function($scope,$calculatorFactory) {
  $scope.settings = {
    enableFriends: true
  };
    
     $scope.calculate = function(expression) {
        var postfix = $calculatorFactory.infixToPostfix(expression);
        $scope.expression = $calculatorFactory.solvePostfix(postfix.trim());
    }
 
    $scope.add = function(value) {
        if($scope.expression === "" || $scope.expression === undefined) {
            $scope.expression = value;
        } else {
            $scope.expression = $scope.expression + " " + value;
        }
    }
    
    $scope.clear=function(){
        $scope.expression="";
        
    }
    
});
