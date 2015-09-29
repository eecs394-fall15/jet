angular
  .module('user')
  .controller("ShowController", function ($scope, User, supersonic) {
    $scope.user = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      User.find($scope.dataId).then( function (user) {
        $scope.$apply( function () {
          $scope.user = user;
          $scope.showSpinner = false;
        });
      });
    };

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.user.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    };

    $scope.addFriendships = function () {

      var User = supersonic.data.model('User');

      supersonic.logger.log("Log check");

      var AronLeon = {
        FirstName:"Aaron",
        LastName:"Leon",
        Company:"Groupon",
        Job:"Intern",
        Language:"English",
        Location:"Chicago",
        Major:"Chemical Engineering",
        Sex:"Male",
        Type:"Student",
        Year:2018

      };
      var JaiveerKothari = {
        FirstName:"Jaiveer",
        LastName:"Kothari",
        Company:"GE",
        Job:"Intern",
        Language:"English",
        Location:"Cincinnati",
        Major:"Computer Science",
        Sex:"Male",
        Type:"Student",
        Year:2017

      };
      var ShuDong = {
        FirstName:"Shu",
        LastName:"Dong",
        Company:"Factual",
        Job:"Intern",
        Language:"English",
        Location:"Chicago",
        Major:"Computer Science",
        Sex:"Male",
        Type:"Student",
        Year:2018

      };

      var userJK = new User(JaiveerKothari);
        userJK.save().then( function() {
          console.log("beer created!");
        });

        var userAL = new User(AronLeon);
        userAL.save().then( function() {
          console.log("beer created!");
        });

        var userSD = new User(ShuDong);
        userSD.save().then( function() {
          console.log("beer created!");
        });
      var query_JayKo = { "LastName": "Ko" };
      var query_AaronLe = { "FirstName": "Aaron"};
      var query_HanChen = { "FirstName":"Han"};

      User.findAll({query_JayKo: JSON.stringify(query_JayKo)}).then(function(users){
        supersonic.logger.log(users[0].FirstName);
      });
      User.findAll().then( function(allUsers) {
        for (i = 0; i < allUsers.length; i++) {
          supersonic.logger.log(allUsers[i].FirstName +" "+ allUsers[i].LastName );
        }
        //Jay Ko
        allUsers[0].Friends=""+allUsers[1].id +","+allUsers[2].id;
        //Aaron Le
        allUsers[1].Friends=""+allUsers[0].id +","+allUsers[2].id + "," + allUsers[5].id;
        //Han Chen
        allUsers[2].Friends=""+allUsers[0].id +","+allUsers[1].id + "," + allUsers[3].id + "," +allUsers[7].id;
        //Rutvij
        allUsers[3].Friends=""+allUsers[2].id +","+allUsers[6].id;
        //Rohan
        allUsers[4].Friends=""+allUsers[6].id;
        //Jon Bohr
        allUsers[5].Friends=""+allUsers[1].id;
        //Chris
        allUsers[6].Friends=""+allUsers[3].id +","+allUsers[4].id + "," +allUsers[7].id;
        //Max Ren
        allUsers[7].Friends=""+allUsers[6].id +","+allUsers[2].id ;
        //Alex
        allUsers[8].Friends=""+allUsers[7].id ;
        //Jaiveer
        allUsers[9].Friends=""+allUsers[5].id ;
        //Shu
        allUsers[10].Friends=""+allUsers[4].id ;
        //Aron
        allUsers[11].Friends=""+allUsers[8].id ;
        for (i = 0; i < allUsers.length; i++) {
          allUsers[i].save().then(function(){
            supersonic.logger.log("saved "+allUsers[i].FirstName);
          });
        }
      });
    };
  });
