angular.module('calculatorApp', []).controller('CalculatorController', function CalculatorController($scope) {
  $scope.z = 0;
  $scope.sum = function() {
    $scope.z = $scope.x + $scope.y;
  };
});
  describe('calculator', function () {

    beforeEach(module('calculatorApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    describe('sum', function () {
      it('1 + 1 should equal 2', function () {
        var $scope = {};
        var controller = $controller('CalculatorController', { $scope: $scope });
        $scope.x = 1;
        $scope.y = 2;
        $scope.sum();
        expect($scope.z).toBe(3);
      });

      it('z should default to zero', function () {
        var $scope = {};
        var controller = $controller('CalculatorController', { $scope: $scope });
        expect($scope.z).toBe(0);
      });
    });

  });
