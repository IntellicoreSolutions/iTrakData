angular.module('stopWatchApp', [])
.controller('stopWatchDemoCtrl', ['$scope', function ($scope) {
    $scope.stopwatch = { log: [] };
}])


.filter('stopwatchTime', function () {
    return function (input) {
        if (input) {

            var elapsed = input.getTime();
            var hours = parseInt(elapsed / 3600000, 10);
            elapsed %= 3600000;
            var mins = parseInt(elapsed / 60000, 10);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000, 10);
            var ms = elapsed % 1000;

            return hours + ':' + mins + ':' + secs;// + ':' + ms;
        }
    };
})
.directive('bbStopwatch', ['StopwatchFactory', function (StopwatchFactory) {
    return {
        restrict: 'EA',
        scope: true,
        link: function (scope, elem, attrs) {

            var stopwatchService = new StopwatchFactory(scope[attrs.options]);

            scope.startTimer = stopwatchService.startTimer;
            scope.stopTimer = stopwatchService.stopTimer;
            scope.resetTimer = stopwatchService.resetTimer;
            scope.showConfirm = stopwatchService.showConfirmation;

        }
    };
}])
.factory('StopwatchFactory', ['$interval','$ionicPopup', '$rootScope', function ($interval, $ionicPopup, $rootScope) {
    return function (options) {

        var startTime = 0,
            currentTime = null,
            offset = 0,
            interval = null,
            self = this;

        if (!options.interval) {
            options.interval = 1000;//was 100
        }

        options.elapsedTime = new Date(0);

        options.running = false;
        options.showreset = false;

        function pushToLog(lap) {
            if (options.log !== undefined) {
                options.log.push(lap);
            }
        }

        self.updateTime = function () {
            currentTime = new Date().getTime();
            var timeElapsed = offset + (currentTime - startTime);
            options.elapsedTime.setTime(timeElapsed);
        };

        self.startTimer = function () {
            if (options.running === false) {
                startTime = new Date().getTime();
                interval = $interval(self.updateTime, options.interval);
                options.running = true;
                options.showreset = false;

                //broadcast to any interested controllers that the timer has been stopped.
                var tableForm = { startTime: startTime, currentTime: new Date().getTime(), interval: options.interval, offset: offset, elapsed: currentTime - startTime };
                $rootScope.$broadcast("ic-stopwatch-started", tableForm);
            }
        };

        self.stopTimer = function () {
            if (options.running === false) {
                return;
            }
            self.updateTime();
            offset = offset + currentTime - startTime;
            pushToLog(currentTime - startTime);
            $interval.cancel(interval);
            options.running = false;
            options.showreset = true;
            
            //broadcast to any interested controllers that the timer has been stopped.
            var tableForm = { startTime: startTime, currentTime: currentTime, interval: options.interval, offset: offset, elapsed: currentTime - startTime };
            $rootScope.$broadcast("ic-stopwatch-stopped", tableForm);
        };

        self.resetTimer = function () {
            startTime = new Date().getTime();
            options.elapsedTime.setTime(0);
            timeElapsed = offset = 0;
            $rootScope.$broadcast("ic-stopwatch-reset");
        };

        self.cancelTimer = function () {
            $interval.cancel(interval);
        };

        return self;

    };
}]);