angular.module('app.controllers', ['ionic', 'stopWatchApp', 'Authentication'])
//angular.module('Authentication')

    .controller('projectsCtrl', function ($scope, projectService, $state, StopwatchFactory, $ionicLoading, $ionicSideMenuDelegate, $timeout, $ionicPopup) {
        console.log('in projects controller');

        //$ionicSideMenuDelegate.canDragContent(false);

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show($ionicLoading);
        projectService.getProjects().then(function (Projects) {
            console.log(Projects);
            $scope.Projects = Projects;
        }).finally(function ($ionicLoading) {
            // On both cases hide the loading
            $scope.hide($ionicLoading);
        });


        //Timeout error
        // $timeout(function() {
        //     $scope.hide($ionicLoading);
        //     $scope.dataLoading = false;
        //
        //     var alertPopup = $ionicPopup.alert({
        //         title: 'Timeout Error',
        //         template: 'This was taking too long! Try again later.'
        //     });
        // }, 22000);

        //$scope.projectClick = function loadProject(clickEvent) {
        //    $scope.clickEvent = simpleKeys(clickEvent);
        //    angular.element(clickEvent.currentTarget);

        //    /*
        //    * return a copy of an object with only non-object keys
        //    * we need this to avoid circular references
        //    */
        //    function simpleKeys(original) {
        //        return Object.keys(original).reduce(function (obj, key) {
        //            obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
        //            return obj;
        //        }, {});
        //    }
        //};

        $scope.setProject = function setProject(Project) {
            projectService.setProject(Project);
            $scope.Project = Project;
        };

        $scope.doRefresh = function () {
            $scope.Projects = projectService.getProjects();
            $scope.$broadcast('scroll.refreshComplete');
        };

    })

    .controller('opportunitiesCtrl', function ($scope, opportunityService, StopwatchFactory) {
        opportunityService.getOpportunities().then(function (Opportunities) {
            $scope.Opportunities = Opportunities;
            console.log($scope.Opportunities);
        });

        $scope.opportunityClick = function loadOpportunity(clickEvent) {
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

    .controller('ticketsCtrl', function ($scope, ticketService, StopwatchFactory) {
        ticketService.getTickets().then(function (Tickets) {
            $scope.Tickets = Tickets;
        });

        $scope.ticketClick = function loadTicket(clickEvent) {
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

    .controller('nominalsCtrl', function ($scope, nominalService, StopwatchFactory) {
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

    .controller('loginCtrl', ['$scope', '$rootScope', '$location', '$state', 'AuthenticationService', '$ionicLoading', '$ionicSideMenuDelegate', '$window', '$timeout', '$ionicPopup',
        function ($scope, $rootScope, $location, $state, AuthenticationService, $ionicLoading, $ionicSideMenuDelegate, $window, $timeout, $ionicPopup) {

        $scope.user = {};
        $scope.user.username = "barry.booth@intellicore.co.uk";
        $scope.user.password = "BJB5_1st3b";

        $ionicSideMenuDelegate.canDragContent(false);

        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        //$scope.show($ionicLoading);

        $scope.login = function () {

            $scope.show($ionicLoading);
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.user.username, $scope.user.password, function (response) {
                if (response.success) {
                    console.log('authentication successful');
                    AuthenticationService.SetCredentials($scope.user.username, $scope.user.password, response.ID);
                    $scope.hide($ionicLoading);
                    $state.go('landingPage');

                } else {
                    $scope.hide($ionicLoading);
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });

            //Timeout error
            $timeout(function() {
                $scope.hide($ionicLoading);
                $scope.dataLoading = false;

                var alertPopup = $ionicPopup.alert({
                    title: 'Timeout Error',
                    template: 'This was taking too long! Try again later.'
                });
            }, 22000);
        }

        $scope.logout = function () {
            console.log('laksjdlaskjdlaksjdlaskjd');
            $scope.dataLoading = true;
            AuthenticationService.ClearCredentials(function (response) {
                if (response.success) {
                    console.log('logged out successful');
                    $state.go('login');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }

            });
        };

        $scope.skip = function () {
            $window.location.href = '#/landing-page';
        };

    }])

    .controller('splashScreenCtrl', function ($scope) {

    })

    .controller('projectTimeCaptureDetailsCtrl', function ($scope, $rootScope, $filter, $stateParams, projectService, StopwatchFactory, $ionicPopup, timesheetService) {
        $scope.Project = projectService.getProject($stateParams.Id, false);
        $scope.Timesheet = {};

        //listen for the stopwatch to be started.
        $scope.$on('ic-stopwatch-started', function (event, args) {

            console.log(args);

            //Log Date
            $scope.Timesheet.date = $filter('date')(new Date(), 'dd/MM/yyyy');
            //Log StartTime
            $scope.Timesheet.starttime = $filter('date')(new Date(), 'dd/MM/yyyy hh:mm:ss');

        });
        //listen for stopwatch stopped.
        $scope.$on('ic-stopwatch-stopped', function (event, args) {
            console.log(args);
            console.log($scope.Description);
            console.log($scope.SelectedPhase);

            //convert the timestamp to a date time object
            var elapsed = args.elapsed;
            var hours = parseInt(elapsed / 3600000, 10);
            elapsed %= 3600000;
            var mins = parseInt(elapsed / 60000, 10);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000, 10);
            var ms = elapsed % 1000;

            //startTime: startTime, currentTime: new Date().getTime(), interval: options.interval, offset: offset, elapsed: offset + (currentTime - startTime) };
            $scope.Timesheet.date = (new Date(args.startTime)).toUTCString();
            $scope.Timesheet.starttime = (new Date(args.startTime)).toUTCString();
            $scope.Timesheet.endtime = (new Date(args.currentTime)).toUTCString();
            console.log('logging...' + args.currentTime + ' - ' + (new Date(args.currentTime)) + ' - ' + (new Date(args.currentTime)).toUTCString());
            $scope.Timesheet.duration = hours + ':' + mins + ':' + secs;
            $scope.Timesheet.project = $scope.Project.id;
            $scope.Timesheet.phase = $scope.SelectedPhase;
            $scope.Timesheet.description = $scope.Description;
            $scope.Timesheet.worktype = "Project";
            $scope.Timesheet.employee = $rootScope.globals.currentUser.id;
            console.log('logging timesheetline: ' + $scope.Timesheet);
            //var employe = "";
            // A confirm dialog
            showConfirm();

        });

        showConfirm = function (args) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Create a Timesheet Line?',
                template: 'Are you still logging time against this task or would you like to create a timesheet line?',
                cancelText: 'Still Working',
                okText: 'Create Time Line',
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Lets Create the Timesheet');
                    console.log('project id: ' + $scope.Project.Id);
                    console.log('project phase: ' + $scope.SelectedPhase);
                    console.log('employee id:' + $scope.Project.employee);

                    var timesheet = {
                        //fill the timesheet out and send it to the create method.
                        project: $scope.Timesheet.project,
                        projectphase: $scope.Timesheet.phase,
                        employee: $scope.Timesheet.employee,
                        date: $scope.Timesheet.date,
                        starttime: $scope.Timesheet.starttime,
                        endtime: $scope.Timesheet.endtime,
                        duration: $scope.Timesheet.duration,
                        description: $scope.Timesheet.description,
                        worktype: $scope.Timesheet.worktype
                    }

                    timesheetService.createTimesheet(timesheet);

                    //update the current project record
                    $scope.Project = projectService.getProject($stateParams.Id, true);

                    //options.resetTimer();
                    //options.showreset = false;
                } else {
                    console.log('Dont Create the Timesheet');
                }
            });
        };
    })

    .controller('supportTimeCaptureDetailsCtrl', function ($scope) {
        supportService.getSupport($stateParams.Id).then(function (Ticket) {
            $scope.Ticket = Ticket;
            console.log($scope.Ticket);
        });
    })

    .controller('supportTimeCaptureNotesCtrl', function ($scope, StopwatchFactory) {

    })

    .controller('opportunityTimeCaptureDetailsCtrl', function ($scope, $stateParams, opportunityService, StopwatchFactory) {
        console.log($stateParams.Id);
        opportunityService.getOpportunity($stateParams.Id).then(function (Opportunity) {
            $scope.Opportunity = Opportunity;
            console.log($scope.Opportunity);
        });
    })

    .controller('nominalTimeCaptureDetailsCtrl', function ($scope, $stateParams, nominalService, StopwatchFactory) {
        nominalService.getNominal($stateParams.Id).then(function (Nominal) {
            $scope.Nominal = Nominal;
            console.log($scope.Nominal);
        });
    })

    .controller('projectTimeCaptureLogTimeCtrl', function ($scope, $stateParams, projectService, StopwatchFactory) {
        $scope.Project = projectService.getProject($stateParams.Id);
    })

    .controller('supportTimeCaptureLogTimeCtrl', function ($scope, StopwatchFactory) {

    })

    .controller('opportunityTimeCaptureLogTimeCtrl', ['$scope', function ($scope, StopwatchFactory) {

    }])

    .controller('nominalTimeCaptureLogTimeCtrl', function ($scope, $stateParams, nominalService, $ionicPopup, StopwatchFactory) {
        //default the use Timer Toggle to true
        $scope.UseTimer = true;
        $scope.stopwatches = [{log: []}];

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

    .controller('landingPageCtrl', ['$scope', '$ionicSideMenuDelegate', function ($scope, $ionicSideMenuDelegate) {
        $ionicSideMenuDelegate.canDragContent(false);
        //$ionicSideMenuDelegate.toggleLeft();
    }])


    .filter('searchNominals', function () {
        return function (Nominals, query) {
            var filtered = [];
            var letterMatch = new RegExp(query, 'i');
            if (Nominals != null) {
                for (var i = 0; i < Nominals.length; i++) {
                    var Nominal = Nominals[i];
                    if (query) {
                        if (letterMatch.test(Nominal.intellic_name.substring(0, query.length))) {
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
                        if (letterMatch.test(Project.intellic_name.substring(0, query.length))) {
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
