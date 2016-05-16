angular.module('app.controllers', ['ionic', 'stopWatchApp', 'Authentication'])
//angular.module('Authentication')

.controller('projectsCtrl', function ($scope, projectService) {
    console.log('in projects controller');
    projectService.getProjects().then(function (Projects) {
        $scope.Projects = Projects;
        console.log($scope.Projects);
    });
})

.controller('opportunitiesCtrl', function ($scope, opportunityService) {
    opportunityService.getOpportunities().then(function (Opportunities) {
        $scope.Opportunities = Opportunities;
    });

    console.log($scope.Opportunities);
})

.controller('ticketsCtrl', function ($scope, ticketService) {
    ticketService.getTickets().then(function (Tickets) {
        $scope.Tickets = Tickets;
    });
})

.controller('nominalsCtrl', function ($scope, nominalService) {
    nominalService.getNominals().then(function (Nominals) {
        $scope.Nominals = Nominals;
    });

    $scope.nominalClick = function loadNominal(clickEvent) {
        $scope.clickEvent = simpleKeys(clickEvent);
        angular.element(clickEvent.currentTarget);
        console.log(angular.element(clickEvent.currentTarget).text());
        /*
        * return a copy of an object with only non-object keys
        * we need this to avoid circular references
        */
        function simpleKeys(original) {
            return Object.keys(original).reduce(function (obj, key) {
                obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
                return obj;
            }, {});
        }
    };
})

.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$state', 'AuthenticationService', function ($scope, $rootScope, $location, $state, AuthenticationService) {
        
    $scope.user = {};
    $scope.user.username = "test";
    $scope.user.password = "test";

        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {

            $scope.dataLoading = true;
            AuthenticationService.Login($scope.user.username, $scope.user.password, function(response) {
                if (response.success) {
                    console.log('authentication successful');
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $state.go('landingPage');

                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        }

        $scope.logout = function () {
            console.log('laksjdlaskjdlaksjdlaskjd');
                $scope.dataLoading = true;
                AuthenticationService.ClearCredentials(function(response) {
                    if (response.success) {
                        console.log('logged out successful');
                        $state.go('login');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                
                });
    };
}])

.controller('splashScreenCtrl', function ($scope) {

})

.controller('projectTimeCaptureDetailsCtrl', function ($scope) {

})

.controller('supportTimeCaptureDetailsCtrl', function ($scope) {

})

.controller('supportTimeCaptureNotesCtrl', function ($scope) {

})

.controller('opportunityTimeCaptureDetailsCtrl', function ($scope) {

})

.controller('nominalTimeCaptureDetailsCtrl', function ($scope, $stateParams, nominalService) {
    nominalService.getNominal($stateParams.Id).then(function (Nominal) {
        $scope.Nominal = Nominal;
    });
})

.controller('projectTimeCaptureLogTimeCtrl', function ($scope) {

})

.controller('supportTimeCaptureLogTimeCtrl', function ($scope) {

})

.controller('opportunityTimeCaptureLogTimeCtrl', ['$scope', function ($scope) {

}])

.controller('nominalTimeCaptureLogTimeCtrl', function ($scope, $stateParams, nominalService, $ionicPopup) {
    //default the use Timer Toggle to true
    $scope.UseTimer = true;
    $scope.stopwatches = [{ log: [] }];

    nominalService.getNominal($stateParams.Id).then(function (Nominal) {
        $scope.Nominal = Nominal;
    });

    $scope.UseTimerToggled = function () {
        console.log('Check if timer is started and if so stop it.');
    }

    nominalService.getTimeLines($stateParams.Id).then(function (Timelines) {
        $scope.Timelines = Timelines;
        console.log($scope.Timelines);
    });

    $scope.createTimeLine = function createTimeLine() {
        console.log('create timesheet line from the static form on page');
    }

    $scope.timelineClick = function timelineNominal(clickEvent) {
        $scope.clickEvent = simpleKeys(clickEvent);
        angular.element(clickEvent.currentTarget);
        console.log(angular.element(clickEvent.currentTarget).text());
        /*
        * return a copy of an object with only non-object keys
        * we need this to avoid circular references
        */
        function simpleKeys(original) {
            return Object.keys(original).reduce(function (obj, key) {
                obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
                return obj;
            }, {});
        }
    };

    //Used to check if timer is running before leaving the page.
    $scope.checkTimer = function checkTimer() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'The Timer is Running!  We arent that sophisticated yet.',
            template: 'The timer will not continue if you leave this page.  Are you sure you want to?  Are you still working or would you like us to create the timeline for you?',
            cancelText: 'Still Working',
            okText: 'Create Time Line',
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Lets Create the Timesheet');
                //self.resetTimer();
                //options.showreset = false;
            } else {
                console.log('Dont Create the Timesheet');
            }
        });
    }

})

.controller('landingPageCtrl', ['$scope', function ($scope) {
}])


.filter('searchNominals', function () {
    return function (Nominals, query) {
        var filtered = [];
        var letterMatch = new RegExp(query, 'i');
        if (Nominals != null) {
            for (var i = 0; i < Nominals.length; i++) {
                var Nominal = Nominals[i];
                if (query) {
                    if (letterMatch.test(Nominal.name.substring(0, query.length))) {
                        filtered.push(Nominal);
                    }
                } else {
                    filtered.push(Nominal);
                }
            }
        }
        return filtered;
    };
})

.filter('searchProjects', function () {
    return function (Projects, query) {
        var filtered = [];
        var letterMatch = new RegExp(query, 'i');
        if (Projects != null) {
            for (var i = 0; i < Projects.length; i++) {
                var Project = Projects[i];
                if (query) {
                    if (letterMatch.test(Project.name.substring(0, query.length))) {
                        filtered.push(Project);
                    }
                } else {
                    filtered.push(Project);
                }
            }
        }
        return filtered;
    };
})

.filter('searchOpportunities', function () {
    return function (Opportunities, query) {
        var filtered = [];
        var letterMatch = new RegExp(query, 'i');
        if (Opportunities != null) {
            for (var i = 0; i < Opportunities.length; i++) {
                var Opportunity = Opportunities[i];
                if (query) {
                    if (letterMatch.test(Opportunity.name.substring(0, query.length))) {
                        filtered.push(Opportunity);
                    }
                } else {
                    filtered.push(Opportunity);
                }
            }
        }
        return filtered;
    };
})


.filter('searchTickets', function () {
    return function (Tickets, query) {
        var filtered = [];
        var letterMatch = new RegExp(query, 'i');
        if (Tickets != null) {
            for (var i = 0; i < Tickets.length; i++) {
                var Ticket = Tickets[i];
                if (query) {
                    if (letterMatch.test(Ticket.name.substring(0, query.length))) {
                        filtered.push(Ticket);
                    }
                } else {
                    filtered.push(Ticket);
                }
            }
        }
        return filtered;
    };
});
