angular.module('app.controllers', ['ionic', 'stopWatchApp', 'Authentication'])
//angular.module('Authentication')

    .controller('AppController', function($scope, $rootScope, $location, $state, AuthenticationService, $ionicLoading, $ionicSideMenuDelegate, $window, $timeout, $ionicPopup) {
        //alert(window.localStorage.getItem("globals"));

        //alert(window.localStorage.getItem("username"));
        //alert(window.localStorage.getItem("password"));

        //alert('hey');

        $scope.user = {};
        $scope.user.username = window.localStorage.getItem("username");
        $scope.user.password = window.localStorage.getItem("password");


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

        }



    })

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

    .controller('opportunitiesCtrl', function ($scope, opportunityService, StopwatchFactory, $ionicLoading) {
        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show($ionicLoading);

        opportunityService.getOpportunities().then(function (Opportunities) {
            $scope.Opportunities = Opportunities;
            console.log($scope.Opportunities);
        }).finally(function ($ionicLoading) {
            // On both cases hide the loading
            $scope.hide($ionicLoading);
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

    .controller('nominalsCtrl', function ($scope, nominalService, StopwatchFactory, $ionicLoading) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show($ionicLoading);
        nominalService.getNominals().then(function (Nominals) {
            $scope.Nominals = Nominals;
        }).finally(function ($ionicLoading) {
            // On both cases hide the loading
            $scope.hide($ionicLoading);
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
            // $timeout(function() {
            //     $scope.hide($ionicLoading);
            //     $scope.dataLoading = false;
            //
            //     var alertPopup = $ionicPopup.alert({
            //         title: 'Timeout Error',
            //         template: 'This was taking too long! Try again later.'
            //     });
            // }, 22000);
        }

        $scope.logout = function () {
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

    .controller('projectTimeCaptureDetailsCtrl', function ($scope, $rootScope, $filter, $stateParams, projectService, StopwatchFactory, $ionicPopup, timesheetService, $ionicLoading) {

        $scope.validationPhase = false;
        $scope.validationDescription = false;

        $scope.Project = projectService.getProject($stateParams.Id, false);
        $scope.Timesheet = {};


        $scope.UserTimerToggled = function() {
            //alert('toggled');
        }

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        //listen for manual time entry
        $scope.createTimeLine = function createTimeLine(selectedPhase, description, selectedPhaseStopwatch, descriptionStopwatch, fromDate, fromTime, toDate, toTime) {

            $scope.validationPhase = false;
            $scope.validationDescription = false;

            if(description == null || description == '') {
                $scope.validationDescription = true;
                return false;
            }

            if(selectedPhase == null || selectedPhase == '') {
                $scope.validationPhase = true;
                return false;
            }

            $scope.Timesheet.project = $scope.Project.id;
            $scope.Timesheet.phase = selectedPhase;
            $scope.Timesheet.description = description;
            $scope.Timesheet.worktype = "Project";
            $scope.Timesheet.employee = $rootScope.globals.currentUser.id;

            $scope.Timesheet.fromDate = fromDate;
            $scope.Timesheet.fromTime = fromTime;
            $scope.Timesheet.toDate = toDate;
            $scope.Timesheet.toTime = toTime;

            $scope.Timesheet.date = toDate;

            $scope.Timesheet.starttime = fromTime;
            $scope.Timesheet.endtime = toTime;

            $scope.milliseconds = toTime - fromTime;

            // Convert duration milliseconds into H:MM
            var durationMilliseconds = new Date($scope.milliseconds);
            var minutes = durationMilliseconds.getMinutes();

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            var duration = durationMilliseconds.getHours() + ":" + minutes;

            $scope.Timesheet.duration = duration;

            console.log('1: ' + selectedPhase);
            console.log('2: ' + description);
            console.log('3: ' + fromDate);
            console.log('4: ' + fromTime);
            console.log('5: ' + toDate);
            console.log('6: ' + toTime);

            showManualConfirm();
        }


        showManualConfirm = function (args) {
            var confirmManualPopup = $ionicPopup.confirm({
                title: 'Create a Timesheet Line?',
                template: 'Are you sure you want to create a timesheet line?',
                cancelText: 'Cancel',
                okText: 'Yes!',
            });

            confirmManualPopup.then(function (res) {
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

                    $scope.show($ionicLoading);

                    //update the current project record
                    return projectService.getProject($stateParams.Id, true).then(function (Project) {
                            if (Project != null) {
                                $scope.Project = Project;
                            }
                        }
                    ).finally(function ($ionicLoading) {
                        $scope.hide($ionicLoading);
                    });

                    //options.resetTimer();
                    //options.showreset = false;
                } else {
                    console.log('Dont Create the Timesheet');
                }
            });
        };


        //listen for the stopwatch to be started.
        $scope.$on('ic-stopwatch-started', function (event, args, selectedPhaseStopwatch, descriptionStopwatch ) {

            console.log(args);
            // console.log('description: ' + args.description);
            // console.log('phase: ' + args.phase);

            //Log Date
            $scope.Timesheet.date = $filter('date')(new Date(), 'dd/MM/yyyy');
            //Log StartTime
            $scope.Timesheet.starttime = $filter('date')(new Date(), 'dd/MM/yyyy hh:mm:ss');

            // if the timer is still running grab all the values from that project and put into local storage
            if (localStorage.getItem('timeStorage') === 'false') {
                window.localStorage.setItem('projectStorage', $scope.Project.id);
                window.localStorage.setItem('projectPhaseStorage', args.phase);
                window.localStorage.setItem('descriptionStorage', args.description);
                window.localStorage.setItem('workTypeStorage', 'Project');
            }

            window.localStorage.setItem('timeStorage', 'true');
            window.localStorage.setItem('startDateStorage', $filter('date')(new Date(), 'dd/MM/yyyy'));

        });
        

        //listen for stopwatch stopped.
        $scope.$on('ic-stopwatch-stopped', function (event, args ) {
			
			//set the timer storage to false to show that there is not other timer running
			window.localStorage.setItem('timeStorage', 'false');
			
            console.log(args);
            console.log('description: ' + args.description);
            console.log('phase: ' + args.phase);

            //convert the timestamp to a date time object
            var elapsed = args.elapsed;
            var hours = parseInt(elapsed / 3600000, 10);
            elapsed %= 3600000;
            var mins = parseInt(elapsed / 60000, 10);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000, 10);
            var ms = elapsed % 1000;

            //startTime: startTime, currentTime: new Date().getTime(), interval: options.interval, offset: offset, elapsed: offset + (currentTime - startTime) };
            $scope.Timesheet.date = new Date(args.startTime);
            $scope.Timesheet.starttime = new Date(args.startTime);
            $scope.Timesheet.endtime = new Date(args.currentTime);
            //console.log('logging...' + args.currentTime + ' - ' + (new Date(args.currentTime)) + ' - ' + (new Date(args.currentTime)).toUTCString());
            $scope.Timesheet.duration = hours + ':' + mins + ':' + secs;
            $scope.Timesheet.project = $scope.Project.id;
            $scope.Timesheet.phase = args.phase; 
            $scope.Timesheet.description = args.description;
            $scope.Timesheet.worktype = "Project";
            $scope.Timesheet.employee = $rootScope.globals.currentUser.id;

            console.log('logging timesheetline: ' + $scope.Timesheet);
            //var employe = "";

            // A confirm dialog
            showConfirm();
        });


        showConfirm = function (args) {

            window.localStorage.setItem('timeStorage', 'false');

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

                    $scope.show($ionicLoading);

                    //update the current project record
                     return projectService.getProject($stateParams.Id, true).then(function (Project) {
                        if (Project != null) {
                            $scope.Project = Project;
                        }
                    }
                    ).finally(function ($ionicLoading) {
                        $scope.hide($ionicLoading);
                    });
                    
                } else {
                    console.log('Dont Create the Timesheet');
                }
            });
        };


        //listen for local storage stopwatch stopped.
        $scope.$on('ic-local-stopwatch-stopped', function (event, args ) {

            // A confirm dialog
            createStorageTimesheet();

        });

        createStorageTimesheet = function () {

            console.log('Storage Timesheet');
            
            //Set the running timer to false and get the end date
            window.localStorage.setItem('timeStorage', 'false');
            window.localStorage.setItem('endDateStorage', $filter('date')(new Date(), 'dd/MM/yyyy'));

            //Pass all of the local storage from running timer into timesheet object
            var timesheet = {
                //fill the timesheet out and send it to the create method.
                project: localStorage.getItem('projectStorage'),
                projectphase: localStorage.getItem('projectPhaseStorage'),
                employee: $rootScope.globals.currentUser.id,
                date: localStorage.getItem('startDateStorage'),
                starttime: localStorage.getItem('startDateStorage'),
                endtime: localStorage.getItem('endDateStorage'),
                duration: localStorage.getItem('durationStorage'),
                description: localStorage.getItem('descriptionStorage'),
                worktype: localStorage.getItem('workTypeStorage')
            }

            //Create the timesheet
            timesheetService.createTimesheet(timesheet);

            // Show loading popup
            $scope.show($ionicLoading);

            //update the current project record
            return projectService.getProject($stateParams.Id, true).then(function (Project) {
                    if (Project != null) {
                        $scope.Project = Project;
                    }
                }
            ).finally(function ($ionicLoading) {
                //Hide the loading popup and remove everything from local storage
                $scope.hide($ionicLoading);

                // just in case...
                localStorage.removeItem('projectStorage');
                localStorage.removeItem('projectPhaseStorage');
                localStorage.removeItem('startDateStorage');
                localStorage.removeItem('startTimeStorage');
                localStorage.removeItem('endDateStorage');
                localStorage.removeItem('endTimeStorage');
                localStorage.removeItem('durationStorage');
                localStorage.removeItem('descriptionStorage');
                localStorage.removeItem('workTypeStorage');

                //Set the running timer to false so we know that no other timer is running
                window.localStorage.setItem('timeStorage', 'false');
            });
        }
        

    })






    .controller('supportTimeCaptureDetailsCtrl', function ($scope) {
        supportService.getSupport($stateParams.Id).then(function (Ticket) {
            $scope.Ticket = Ticket;
            console.log($scope.Ticket);
        });
    })

    .controller('supportTimeCaptureNotesCtrl', function ($scope, StopwatchFactory) {

    })

    .controller('opportunityTimeCaptureDetailsCtrl', function ($scope, $stateParams, opportunityService, $ionicLoading, StopwatchFactory) {
        console.log($stateParams.Id);

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show($ionicLoading);

        opportunityService.getOpportunity($stateParams.Id).then(function (Opportunity) {
            $scope.Opportunity = Opportunity;
            console.log($scope.Opportunity);
        }
        ).finally(function ($ionicLoading) {
            $scope.hide($ionicLoading);
        });
    })

    .controller('nominalTimeCaptureDetailsCtrl', function ($scope, $stateParams, nominalService, $ionicLoading, StopwatchFactory) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show($ionicLoading);

        nominalService.getNominal($stateParams.Id).then(function (Nominal) {
            $scope.Nominal = Nominal;
            console.log($scope.Nominal);
        }
        ).finally(function ($ionicLoading) {
            $scope.hide($ionicLoading);
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
