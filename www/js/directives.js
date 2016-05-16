angular.module('app.directives', ['Authentication'])

.directive('log-out', ['AuthenticationService', function(AuthenticationService) {
    return {
        link: function ($scope, element) {
            element.on('click', function () {
                console.log('in correct directive');
                AuthenticationService.logout();
            });
        }
    }
}])

.directive('blankDirective', [function(){

}]);

