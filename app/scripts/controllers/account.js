'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('tipntripApp').controller('AccountCtrl', function ($scope, $rootScope, user, Auth, Ref, $firebaseObject, $timeout) {


    $scope.user = user;


    $scope.messages = [];
    var unbind;
    // create a 3-way binding with the user profile object in Firebase
    var profile = $firebaseObject(Ref.child('users/' + user.uid));
    profile.$bindTo($scope, 'profile').then(function (ub) {
        unbind = ub;
    });

    $scope.logout = function () {
        Auth.$unauth();
        // on logout broadcast logout event to destroy firebase references to prevent permission denied error 
        $rootScope.$broadcast('logout');
    };

    $rootScope.$on('logout', function () {
        if (unbind) {
            unbind();
        }
        profile.$destroy();
    });



    $scope.changePassword = function (oldPass, newPass, confirm) {
        $scope.err = null;
        if (!oldPass || !newPass) {
            error('Please enter all fields');
        }
        else if (newPass !== confirm) {
            error('Passwords do not match');
        }
        else {
            Auth.$changePassword({email: profile.email, oldPassword: oldPass, newPassword: newPass})
                    .then(function () {
                        success('Password changed');
                    }, error);
        }
    };

    $scope.changeEmail = function (pass, newEmail) {
        $scope.err = null;
        Auth.$changeEmail({password: pass, newEmail: newEmail, oldEmail: profile.email})
                .then(function () {
                    profile.email = newEmail;
                    profile.$save();
                    success('Email changed');
                })
                .catch(error);
    };

    function error(err) {
        alert(err, 'danger');
    }

    function success(msg) {
        alert(msg, 'success');
    }

    function alert(msg, type) {
        var obj = {text: msg + '', type: type};
        $scope.messages.unshift(obj);
        $timeout(function () {
            $scope.messages.splice($scope.messages.indexOf(obj), 1);
        }, 10000);
    }

});
