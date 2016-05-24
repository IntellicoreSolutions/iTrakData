angular.module('app.services', [])

// define the Project factory
.factory('projectService', function($http) {
    var projects;
    var timelines;
    var project;

	return {
	    clearProjects: function () {
	        projects = null;
	        project = null;
	    },
	    setProjects: function (Projects) {
	        projects = Projects;
	    },
	    setProject: function(Project){
	        project = Project;
	    },
	    getProjects: function () {
	        console.log('projectService Factory - in Get Projects');
	        if (projects == null) {
	            return $http.get("http://localhost:5562/crmapi/project").then(function (response) {
	                projects = response.data;
	                return projects;
	            });
	        }
	        else {
	            return projects;
	        }
		},
	    getProject: function (id, forceRefresh) {
	        console.log('projectService Factory - in Get Project');
	        console.log(id);
	        var url = "http://localhost:5562/crmapi/project?uid=" + id;
	        if (project != null && project.id != id) {
	            console.log('return the current project because it has the id im looking for');
	            return project;
	        }
	        else {
	            if (projects != null && !forceRefresh) {
	                //Loop through the projects
	                for (var i = 0; i < projects.length; i++) {
	                    if (projects[i].id === id) {
	                        console.log('return project: '+project+' as the id matches');
	                        return projects[i];
	                    }
	                }
	                //Couldnt find it in the current local list so call the webservices
	                
	                return $http.get(url).then(function (response) {
	                    console.log('had to go and fetch the project with id:'+id+' from the webservices even though we have a local list of projects');
	                    project = response.data;
	                    return project;
	                });
	            }
	            else {
	                return $http.get(url).then(function (response) {
	                    console.log('had to go and fetch the project with id:' + id + ' from the webservices because we dont have a list of local projects');
	                    project = response.data;
	                    return project;
	                });
	            }
	        }
	        return null;
		}
	}
})

// define the Nominal factory
.factory('nominalService', function($http) {
    var nominals;
    var timelines;
	var nominal;
	return {
		getNominals: function(){
		    return $http.get("http://localhost:5562/crmapi/nominal").then(function (response) {
		        nominals = response.data;
		        console.log(response.data);
				return nominals;
			});
		},
		getNominal: function (id) {
		    console.log(id);
		    var url = "http://localhost:5562/crmapi/nominal?uid=" + id;
		    return $http.get(url).then(function (response) {
		        nominal = response.data;
		        console.log(nominal);
		        return nominal;
		    });
		    return null;
		},
		setNominal: function(nominal)
		{
			Nominal = nominal;
		    return Nominal;
		},
		getTimeLines: function (id) {
		    console.log('in getTimeLines');
		    var url = "http://services.groupkt.com/country/get/all";// + id;
		    return $http.get(url).then(function (response) {
		        timelines = response.data.RestResponse.result;
		        return timelines;
		    });
		    return null;
		}
	}
})

// define the Opportunity factory
.factory('opportunityService', function($http) {
	var opportunities;
	var opportunity;

	return {
	    getOpportunities: function () {
	        console.log('opportunityService Factory - in Get Opportunities');
	        return $http.get("http://localhost:5562/crmapi/opportunity").then(function (response) {
		        opportunities = response.data;
				return opportunities;
			});
		},
	    getOpportunity: function (id) {
	        console.log('opportunityService Factory - in Get Opportunity');
	        var url = "http://localhost:5562/crmapi/opportunity?uid=" + id;
	        return $http.get(url).then(function (response) {
	            opportunity = response.data;
	            return opportunity;
	        });
	        return null;
	    },
	    createOpportunity: function (opportunity) {
	        console.log(opportunity);

	        return $http({
	            url: 'http://localhost:5562/crmapi/opportunity',
	            method: 'POST',
	            data: opportunity,
	            headers: { 'Content-Type': 'application/json' }
	        }).success(function (data, status, header, config) {
	            console.log(data, status);
	        }).error(function (data, status, header, config) {
	            console.log(data, status);
	        });
	    }
	}
})

// define the Nominal factory
.factory('ticketService', function($http) {
	var tickets;
	var ticket;

	return {
	    getTickets: function () {
	        console.log('ticketService Factory - in Get Tickets');
	        return $http.get("http://localhost:5562/crmapi/ticket").then(function (response) {
	            tickets = response.data;
	            console.log(tickets);
				return tickets;
			});
		},
	    getTicket: function (id) {
	        console.log('ticketService Factory - in Get Ticket');
	        var url = "http://localhost:5562/crmapi/nominal?uid=" + id;
	        return $http.get(url).then(function (response) {
	            ticket = response.data;
	            return ticket;
	        });
	        return null;
		},
		createTicket: function(ticket)
		{
			console.log(ticket);

			return $http({
			    url: 'http://localhost:5562/crmapi/ticket',
				method: 'POST',
				data: ticket,
				headers: {'Content-Type': 'application/json'}
				}).success(function (data, status, header, config){
					console.log(data, status);
				}).error(function (data, status, header, config) {
					console.log(data, status);
				});
		}
	}
})

// define the Nominal factory
.factory('timesheetService', function($http) {
	var tickets = [];

	return {
		getTimesheets: function(){
			return $http.get("https://webapi.intellicore.co.uk/timesheets/getTimesheets").then(function(response){
				tickets = response;
				return tickets;
			});
		},
		getTimesheet: function(id){
			for(i=0;i<tickets.length;i++){
				if(tickets[i].id == id){
					return tickets[i];
				}
			}
			return null;
		},
		createTimesheet: function(timesheetline)
		{
			console.log(timesheetline);

			return $http({
			    url: 'http://localhost:5562/crmapi/timesheetline',
				method: 'POST',
				data: timesheetline,
				headers: {'Content-Type': 'application/json'}
				}).success(function (data, status, header, config){
					console.log(data, status);
				}).error(function (data, status, header, config) {
					console.log(data, status);
				});
		}
	}
})


.service('BlankService', [function(){
}])

