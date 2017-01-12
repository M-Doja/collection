(function (){
'use strict';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyCfn5JzmHOKZJUStYKNSo7xGnlLQDh0PGk",
   authDomain: "lisanaphotodb.firebaseapp.com",
   databaseURL: "https://lisanaphotodb.firebaseio.com"
 }; // end

 firebase.initializeApp(config);
 const app = angular.module('lPhoto', ['firebase', 'ui.router']);

// Routing Config
 app.config(Config);
 function Config($stateProvider, $urlRouterProvider) {
   $stateProvider.state("Home", {
     url: "/",
     templateUrl: "views/home.html"
   }).state('Gallery', {
     url: "/gallery",
     templateUrl: "views/gallery.html"
   }).state("Contact", {
     url: "/contact",
     templateUrl: "views/contact.html"
   });
   $urlRouterProvider.otherwise("/")
 } // end


app.controller('galleryCtrl', ($scope, $firebaseArray, $firebaseObject, $firebaseAuth) => {

   //  Get reference to DB
   const ref = firebase.database().ref();
   const famImgRef = ref.child('familyImages');
   const travImgRef = ref.child('travelImages');
   const urbImgRef = ref.child('urbanImages');
   $scope.photos = $firebaseArray(famImgRef);
   $scope.travPhotos = $firebaseArray(travImgRef);
   $scope.urbPhotos = $firebaseArray(urbImgRef);

   // Saving & previewing img
   $scope.previewFile = () => {
     const preview = document.querySelector('img'); //selects the query named img
     const file    = document.querySelector('input[type=file]').files[0]; //sames as here
     const reader  = new FileReader();
     const fBox = document.getElementById("famCk").checked;
     const uBox = document.getElementById("urbCk").checked;
     const tBox = document.getElementById("travCk").checked;
     console.log(fBox);

     // Saving img to Firebase & localStorage
     reader.onloadend = () => {
         preview.src = reader.result;
         localStorage.setItem('src', reader.result);

        //  IF then
        if (fBox) {
          $scope.photos.$add({
            imageURL: reader.result
          });
        }else if (uBox) {
          $scope.urbPhotos.$add({
            imageURL: reader.result
          });
        }else if (tBox) {
          $scope.travPhotos.$add({
            imageURL: reader.result
          });
        } else {
          alert("please check a box category")
        }

         $("#box").css("background", "white");
         $("#upBtn").fadeOut();
     } // end

     // Display of img
     const picSrc = localStorage.getItem('src');

   firebase.auth().signInAnonymously().then(function() {
     firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(uid);

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            preview.src = picSrc;
        }

      } else {
        console.log('User is signed out.');
        // ...
      }
      // ...
    });

  });



  }; // end preview


}); // end ctrl

// My1FreeLanceJob
// My1OutSourceJob

})();
