﻿var app = angular.module('dataServices', ['ngResource'])
  .factory('Feedback', function($resource) {
    return $resource('/api/feedback/:id', { id: '@id' });
  })
  .factory('pollingStationService', ['$q', '$http', function($q, $http) {

      var _getPollingStationReport = function (pollingStation, startDate, endDate) {
          var deferred = $q.defer();
        $http.get("/api/reports/pollingstation", { params: { "start": startDate, "end": endDate, "reportName": pollingStation } })
              .then(
                  function(result) { // success
                      deferred.resolve(result.data);
                  },
                  function(status) { // error
                      deferred.reject(status);
                  });
          return deferred.promise;
      };

      var _getCompanyFeedbackReport = function (startDate, endDate) {
          var deferred = $q.defer();
        $http.get("/api/reports/company", { params: { "startDate": startDate, "endDate": endDate } })
              .then(
                  function (result) { // success
                      deferred.resolve(result.data);
                  },
                  function(status) { // error
                      deferred.reject(status);
                  });
          return deferred.promise;
      };

      var getPollingStations = function () {
          var deferred = $q.defer();
        $http.get("/api/polling-stations")
              .then(
                  function (result) { // success
                      deferred.resolve(result.data);
                  },
                  function (status) { // error
                      deferred.reject(status);
                  });
          return deferred.promise;
      };

      var updatePollingStation = function (station) {
          var deferred = $q.defer();
        $http.put("/api/pollingstations/" + station.id, station)
              .then(
                  function (result) { // success
                      deferred.resolve(result.data);
                  },
                  function (status) { // error
                      deferred.reject(status);
                  });
          return deferred.promise;
      };

      return {
          getCompanyFeedbackReport: _getCompanyFeedbackReport,
          getPollingStationReport: _getPollingStationReport,
          getPollingStations: getPollingStations,
          updatePollingStation: updatePollingStation
      };
  }])
  .factory('questionsService', ['$q', '$http', function ($q, $http) {
      
      var getQuestions = function (category) {
          var deferred = $q.defer();
          $http.get("/api/questions", { params: { "category": category} })
              .then(
                  function (result) { // success
                      deferred.resolve(result.data);
                  },
                  function (status) { // error
                      deferred.reject(status);
                  });
          return deferred.promise;
      };

      var getRandomQuestions = function(category, numberOfQuestions) {
          var questions = [];
          return getQuestions(category).then(function(questionArray) {
              //first check if we have enough questions
              if (questionArray.length <= numberOfQuestions) {
                  return questionArray;
              }
              //generate a random array of questions
              while (questions.length < numberOfQuestions) {
                  var index = Math.floor(Math.random() * questionArray.length);
                  var question = questionArray[index];
                  var questionUsed = false;
                  for (var i = 0; i < questions.length; i = i + 1) {
                      if (questions[i] === question) {
                          questionUsed = true;
                      }
                  }
                  if (!questionUsed) {
                      questions.push(question);
                  }
              }
              return questionArray;
          }).then(function(q) {
              return q;
          });
      };

      var addQuestion = function (text, category) {
          var deferred = $q.defer();
          var question = { text: text, category: category };
          $http.post('/api/questions', question);
          return deferred.promise;
      };

      return {
          getRandomQuestions: getRandomQuestions,
          getQuestions: getQuestions,
          addQuestion: addQuestion
      };
  }])
  .factory('utils', function () {
      var _getDayOfTheWeek = function (date) {
          date = new Date(date);
          var weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";
          return weekday[date.getDay()];
      };
      return {
          getDayOfTheWeek: _getDayOfTheWeek
      };
  });


