angular
  .module('demo')
  .controller('IndexController', function($scope, supersonic) {
    var buildGraphMatrice = function(indexedIds, allUsers) {
      for (i = 0; i < allUsers.length; i++) {
        allUsers[i].friends.split(',').forEach(friendId) {
          col = indexedIds[friendId];
          matrix[i][col] = 1;
        }
      }
      return matrix;
    }

    var runFloyd = function(userId, targetIds, matrice, allUsers) {
      MAX = allUsers.length;
      for(k = 0; k < MAX; k++) {
        for(i = 0; i < MAX; i++){
          for(j = 0; j < MAX; j++){
            if(matrice[i][j] > matrice[i][k] + matrice[k][j])){
              matrice[i][j] = matrice[i][k] + matrice[k][j];
            }
          }
        }
      }
      return matrice;
    }

    // Controller functionality here
    $scope.findPath = function(userData) {
      var company = userData["company"];
      var userId = userData["userId"];
      var User = supersonic.data.model('User');

      var indexedIds = {};
      var matrix = {};
      var targetUserIds = []
      User.findAll().then( function(allUsers) {
        for (i = 0; i < allUsers.length; i++) {
          matrix[i] = {}
          indexedIds[allUsers[i].id] = i;
          if (allUsers[i].company == company) {
            targetUserIds.push(allUsers[i].id);
          }
        }
        matrice = buildGraphMatrice(indexedIds, allUsers);
      })

      return targetUserIds;
    }
  });
