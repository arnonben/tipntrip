'use strict';
/**
 * @ngdoc function
 * @name tipntripApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 */
angular.module('tipntripApp').controller('ChatCtrl', function ($scope, $rootScope, user, Ref, $q, $firebaseArray, $firebaseObject, $timeout, chatService, userService, searchService, $routeParams) {



    /* Firebase USER actions */

    /* user from the route resolve, contains logged in users' data */
    $scope.user = user;

    /* $scop.users stores information about user's details and used in many place like showing name in chat list and in single chat's message body */
    $scope.users = {};

    $scope.getUser = function (uid) {
        if (typeof $scope.users[uid] === "undefined") {
            $scope.users[uid] = userService.get(uid);
        }
    };

    /* Get loggedIn user ( again )*/
    $scope.getUser($scope.user.uid);


    var unbind;
    // create a 3-way binding with the user profile object in Firebase
    var profile = userService.get($scope.user.uid);
    profile.$bindTo($scope, 'profile').then(function (ub) {
        unbind = ub;
    });

    $rootScope.$on('logout', function () {

        if (unbind) {
            unbind();
        }
        profile.$destroy();

        angular.forEach($scope.messages, function (value, key) {
            if (typeof $scope.messages[key] !== 'undefined') {
                $scope.messages[key].$destroy();
            }
        });

        angular.forEach($scope.users, function (value, key) {
            if (typeof $scope.users[key] !== 'undefined') {
                $scope.users[key].$destroy();
            }
        });

        $scope.chats.$destroy();
        $scope.selected = null;
        
    });



    /* Firebase USER actions ends*/

    /* Firebase CHAT actions */

    /* $scope.chats stores all the chats the logged in user part of ( it'll be sorted by modified time  
     so latest chat will always comes on the top 
     */
    $scope.chats = chatService.getChats($scope.user.uid);

    /* on chat list load fetch all the related details like chat's members, member's user details etc */
    $scope.chats.$watch(function (event) {
        if (event.event == 'child_removed') {
            return;
        }
        if ($routeParams.chatId == event.key && event.key != $scope.selected) {
            $scope.selectChat($routeParams.chatId);
        }
        if (event.event == "child_changed" && event.key == $scope.selected) {
            chatService.markReadUserChat($scope.user.uid, event.key);
        }
        $scope.loadChatDetails(event.key);
    });



    /* $scope.loadChatDetails updates the $scope.users with chat's user */
    $scope.loadChatDetails = function (chat_id) {
        var chatWith = $scope.getChatWith(chat_id);
        $scope.chats[$scope.chats.$indexFor(chat_id)].chatWith = chatWith;
        $scope.getUser(chatWith);
    }

    $scope.getChat = function (chat_id) {
        return $scope.chats[$scope.chats.$indexFor(chat_id)];
    }

    $scope.getChatWith = function (chat_id) {
        return chatService.getUserFromChatId(chat_id, $scope.user.uid);
    }

    /* Firebase CHAT actions ends*/




    /* Util functions */

    /* This function used to display error messages */
    function alert(msg) {
        $scope.loading.send = false;
        $scope.err = msg;
        $timeout(function () {
            $scope.err = null;
        }, 5000);
    }


    /* Util functions ends */







    /* $scope.selected used to determine which chat is currently selected */

    $scope.selected = null;


    /* $scope.messages stores all chat's messages */
    $scope.messages = {};

    $scope.loading = {messages: false, send: false};







    /* Start New Chat */

    $scope.initNewChat = function () {
        $scope.$broadcast('angucomplete-alt:clearInput');
        $scope.selected = false;
    }


    $scope.userslist = {};
    $scope.minlength = 2;
    $scope.watchSearchResultInit = false;
    $scope.$broadcast('angucomplete-alt:clearInput');


    // Here is a naive implementation for matching first name, last name, or full name
    $scope.localSearch = function (str) {
        var words = false;
        return searchService.searchUser('firebase', searchService.buildQuery(str, words));
    };

    $scope.selectedUser = function (user) {
        if (user) {
            var chat_id = chatService.getChatId(user.originalObject._id, $scope.user.uid);
            $scope.selectChat(chat_id);
        } else {
            console.log('cleared');
        }
    };

    /* Start New Chat Ends*/





    /* This function is use to select chat  */
    $scope.selectChat = function (chat_id)
    {
        /* store selected chat id */
        $scope.selected = chat_id;
        $scope.loading.messages = true;

        /* fetch messages of selected chat */
        $scope.messages[chat_id] = chatService.getChatMessages(chat_id);

        $scope.messages[chat_id].$loaded().then(function () {
            $scope.loading.messages = false;
            chatService.markReadUserChat($scope.user.uid, chat_id);
        }, function (error) {
            alert(error);
            $scope.loading.messages = false;
        }).catch(alert);

    }



    $scope.newMessage = chatService.initMessage($scope.user.uid);

    $scope.emojiMessage = {};
    $scope.emojiMessage.messagetext = $scope.emojiMessage.rawhtml = null;
    $('#messageDiv').html('');




    $scope.emojiMessage.replyToUser = function () {
        console.log($scope.newMessage);
        if (profile.EnterToSend && $scope.selected && profile.EnterToSend && ($scope.newMessage.text || $scope.newMessage.file)) {

            $scope.emojiMessage.messagetext = $scope.emojiMessage.rawhtml = null;
            $('#messageDiv').html('');
            return $scope.sendMessage($scope.newMessage, $scope.selected);

        }
    }

    /* To send message to chat */
    $scope.sendMessage = function (newMessage, chat_id) {
        $scope.emojiMessage.messagetext = $scope.emojiMessage.rawhtml = null;
        $('#messageDiv').html('');
        $scope.loading.send = true;

        $scope.newMessage = chatService.initMessage($scope.user.uid);

        chatService.sendMessage(newMessage, chat_id).then(function (ref) {
            console.log("new message added with id " + ref.key());
            $scope.loading.send = false;
        }, function (error) {
            alert(error);
            $scope.loading.send = false;
        })
        return;
    };

});

