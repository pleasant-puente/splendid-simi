var locator = angular.module('parkAssist.locator');
var Q = require('q');
var fb_keys = require('../../../firebaselink.js');

locator.factory('Locator', ['$http', function ($http) {

  var createUser = function (tuple, range) {
    var deferred = Q.defer();
    
    //Create a new user on firebase
    var fb = new Firebase(fb_keys.url);
    var dbUser = fb.child('Users').push({ latitude: tuple[0], longitude: tuple[1], range: range });
    
    deferred.resolve(dbUser);

    return deferred.promise;
  };

  var reserveSpace = function(meterId){
    var fb = new Firebase('https://parkassistapp.firebaseio.com/');

    console.log('reserveSpace from locatorService.js');
    var deferred = Q.defer();

    console.log('about to reserve space #'+meterId+' in the db');
    var reference = fb.child('MeteredParkingSpots').child(meterId).child('reserved').set(Date.now()+600000);
    deferred.resolve(meterId);

    return deferred.promise;
  };

  return {
    createUser : createUser,
    reserveSpace : reserveSpace
  };
}]);
