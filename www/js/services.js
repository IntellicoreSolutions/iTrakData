angular.module('app.services', [])

// define the Project factory
.factory('projectService', function($http) {
    var projects;
    var project;

	return {
	    getProjects: function () {
	        console.log('projectService Factory - in Get Projects');
			return $http.get("http://services.groupkt.com/country/get/all").then(function(response){
			    projects = response.data.RestResponse.result;
				return projects;
			});
		},
	    getProject: function (id) {
	        console.log('projectService Factory - in Get Project');
	        var url = "http://services.groupkt.com/country/get/iso2code/" + id;
	        return $http.get(url).then(function (response) {
	            project = response.data.RestResponse.result;
	            return project;
	        });
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
			return $http.get("http://services.groupkt.com/country/get/all").then(function(response){
				nominals = response.data.RestResponse.result;
				return nominals;
			});
		},
		getNominal: function (id) {
		    var url = "http://services.groupkt.com/country/get/iso2code/" + id;
		    return $http.get(url).then(function (response) {
		        nominal = response.data.RestResponse.result;
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
		    return $http.get("http://services.groupkt.com/country/get/all").then(function (response) {
		        opportunities = response.data.RestResponse.result;
				return opportunities;
			});
		},
	    getOpportunity: function (id) {
	        console.log('opportunityService Factory - in Get Opportunity');
	        var url = "http://services.groupkt.com/country/get/iso2code/" + id;
	        return $http.get(url).then(function (response) {
	            opportunity = response.data.RestResponse.result;
	            return opportunity;
	        });
	        return null;
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
		    return $http.get("http://services.groupkt.com/country/get/all").then(function (response) {
		        tickets = response.data.RestResponse.result;
				return tickets;
			});
		},
	    getTicket: function (id) {
	        console.log('ticketService Factory - in Get Ticket');
	        var url = "http://services.groupkt.com/country/get/iso2code/" + id;
	        return $http.get(url).then(function (response) {
	            ticket = response.data.RestResponse.result;
	            return ticket;
	        });
	        return null;
		},
		createTicket: function(ticket)
		{
			console.log(ticket);

			return $http({
				url: 'http://webapi.intellicore.co.uk/tickets/createTicket',
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
		createTimesheet: function(timesheet)
		{
			console.log(timesheet);

			return $http({
				url: 'http://webapi.intellicore.co.uk/timesheet/createTimesheet',
				method: 'POST',
				data: timesheet,
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

