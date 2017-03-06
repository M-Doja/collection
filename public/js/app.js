(function (){
// Initialize Firebase
 var config = {
   apiKey: "AIzaSyCfn5JzmHOKZJUStYKNSo7xGnlLQDh0PGk",
   authDomain: "lisanaphotodb.firebaseapp.com",
   databaseURL: "https://lisanaphotodb.firebaseio.com"
 }; // end

 firebase.initializeApp(config);
 const app = angular.module('lPhoto', ['firebase', 'ui.router', 'ngAnimate' ]);

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
   }).state("FamilyImg", {
     url: "/family_collection",
     templateUrl: "views/FamilyCollection2.html"
   }).state("TravelImg", {
     url: "/travel_collection",
     templateUrl: "views/TravelCollection.html"
   }).state("UrbanImg", {
     url: "/urban_collection",
     templateUrl: "views/UrbanCollection.html"
   }).state("upload", {
     url: "/auth_upload",
     templateUrl: "views/Upload.html"
   });
   $urlRouterProvider.otherwise("/")
 } // end
app.factory('DataSource', ['$http',function($http){
       return {
           get: function(fileName,callback){
                $http.get(fileName).
                success(function(data, status) {
                    callback(data);
                });
           }
       };
    }]);

app.controller('galleryCtrl', ($scope, $state, $firebaseArray, $firebaseObject, $firebaseAuth, DataSource) => {

   //  Get reference to DB
   const ref = firebase.database().ref();
   const famImgRef = ref.child('familyImages');
   const travImgRef = ref.child('travelImages');
   const urbImgRef = ref.child('urbanImages');
   const adminRef = ref.child('Admin/');
   const adminKey = adminRef.push();
   const fbtn = document.getElementById('fam-card');
   $scope.photos = $firebaseArray(famImgRef);
   $scope.travPhotos = $firebaseArray(travImgRef);
   $scope.urbPhotos = $firebaseArray(urbImgRef);
   $scope.Admin = $firebaseArray(adminRef);
   const x = $("#click");
  //  console.log(x)
   var dBTN = $(".t2");
   var form = $("#wrap");
   dBTN.hide();
   form.hide();
   firebase.auth().signInAnonymously().then(function() {
     firebase.auth().onAuthStateChanged(function(user) {
       $scope.Admin = $firebaseArray(adminRef);
      if (user) {

      localStorage.setItem('token', 'photobomb');
      // localStorage.removeItem('');
       x.on("click", function (){
         const tar = localStorage.getItem('token');
         var q = prompt("Enter auth email")
         console.log(tar);
         console.log(q);
         if (tar === q) {
          dBTN.show();
          form.show();
          alert('true')
         }else {
          alert('false')
         }
       });


     }
   });
 });

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
        //paste this code under the head tag or in a separate js file.
      	// Wait for window load
      	$(window).load(function() {
      		// Animate loader off screen
      		$(".se-pre-con").fadeOut("slow");;
      	});
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



  // initial image index
$scope._Index = 0;
// if a current image is the same as requested image
$scope.isActive = function (index) {
  return $scope._Index === index;
};



// show prev image
$scope.showPrev = function () {
$scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
};

$scope.showTPrev = function () {
$scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.travPhotos.length - 1;
};

$scope.showUPrev = function () {
  $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.urbPhotos.length - 1;
};






// show next image
$scope.showNext = function () {
  $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
};
// show next image
$scope.showTNext = function () {
  $scope._Index = ($scope._Index < $scope.travPhotos.length - 1) ? ++$scope._Index : 0;
};
// show next image
$scope.showUNext = function () {
  $scope._Index = ($scope._Index < $scope.urbPhotos.length - 1) ? ++$scope._Index : 0;
};




// show a certain image
$scope.showPhoto = function (index) {
  $scope._Index = index;
};
// show a certain image
$scope.showTPhoto = function (index) {
  $scope._Index = index;
};
// show a certain image
$scope.showUPhoto = function (index) {
  $scope._Index = index;
};


}); // end ctrl


})();
