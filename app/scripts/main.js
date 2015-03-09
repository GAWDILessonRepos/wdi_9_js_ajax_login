'use strict';

var App = (function() {
  var authToken, apiHost;

  var init = function() {
    // When page loads, pull authToken out of localStorage
    // If might be undefined, which is great
    authToken = localStorage.getItem('authToken');

    apiHost = 'http://localhost:3000/api/v1';

    setupAjaxRequests();

    $('#loadPosts').on('click', loadPosts);
  };

  var setupAjaxRequests = function() {
    $.ajaxPrefilter(function( options ) {
      options.headers = {};
      options.headers['Authorization'] = authToken;
    });
  };


  // Let's assume that this requires login
  var loadPosts = function() {
    $.ajax({
      url: apiHost + '/posts',
      type: 'GET',
      dataType: 'json'
    })
    .done(displayPosts)
    .fail(acceptFailure);
  };

  var displayPosts = function(posts) {
    console.table(posts);
  };

  var acceptFailure = function(error) {
    // If things are failing, deal with specific errors
    // If status is unauthorized, then redirect to a login route/page
    if (error.status === 401) {
      console.log('SEND TO LOGIN SCREEN');
    }
  };

  return {init: init};
})();


var AppRouter = Backbone.Router.extend({
    routes: {
        "*actions": "defaultRoute" // matches http://example.com/#anything-here
    }
});

$(document).ready(function() {

  App.init();

  // var app_router = new AppRouter;
  // app_router.on('route:defaultRoute', function(actions) {
  //     alert(actions);
  // });
  // Backbone.history.start();

});

// Set the Ajax headers for all requests to send token

// Have a 'not logged in' failure function that redirects you to a login page
