angular
  .module('demo')
  .controller('IndexController', function($scope, supersonic) {
    $scope.targetUsers = [];
    $scope.company = '';
    var userId = '560a50cb9a15f9001d000001';

    function PriorityQueue () {
      this._nodes = [];

      this.enqueue = function (priority, key) {
        this._nodes.push({key: key, priority: priority });
        this.sort();
      };
      this.dequeue = function () {
        return this._nodes.shift().key;
      };
      this.sort = function () {
        this._nodes.sort(function (a, b) {
          return a.priority - b.priority;
        });
      };
      this.isEmpty = function () {
        return !this._nodes.length;
      };
    }

    function Graph(){
      var INFINITY = 1/0;
      this.vertices = {};

      this.addVertex = function(name, edges){
        this.vertices[name] = edges;
      };

      this.shortestPath = function (start, finish) {
        var nodes = new PriorityQueue(),
            distances = {},
            previous = {},
            path = [],
            smallest, vertex, neighbor, alt;

        for(vertex in this.vertices) {
          if(vertex === start) {
            distances[vertex] = 0;
            nodes.enqueue(0, vertex);
          }
          else {
            distances[vertex] = INFINITY;
            nodes.enqueue(INFINITY, vertex);
          }

          previous[vertex] = null;
        }

        while(!nodes.isEmpty()) {
          smallest = nodes.dequeue();

          if(smallest === finish) {


            while(previous[smallest]) {
              path.push(smallest);
              smallest = previous[smallest];
            }

            break;
          }

          if(!smallest || distances[smallest] === INFINITY){
            continue;
          }

          for(neighbor in this.vertices[smallest]) {
            alt = distances[smallest] + this.vertices[smallest][neighbor];

            if(alt < distances[neighbor]) {
              distances[neighbor] = alt;
              previous[neighbor] = smallest;

              nodes.enqueue(alt, neighbor);
            }
          }
        }

        return path;
      };
    }

    var computeShortestPath = function(start, targets, graph) {
      var sizeMin = Number.MAX_VALUE;
      var finalPath = [];
      for (i = 0; i < targets.length; i++) {
        var path = graph.shortestPath(start, targets[i]);
        if (path.length < sizeMin && path.length > 0) {
          finalPath = path;
          sizeMin = path.length;
        }
      }
      if (finalPath.length > 0) {
        return finalPath.concat([start]).reverse();
      } else {
        return finalPath;
      }
    };

    var addVertex = function(graph, user) {
      var friends = user.Friends;
      if (typeof(friends) != "undefined") {
        var vertexValue = {};
        friends.split(',').forEach(function(friendId) {
           vertexValue[friendId] = 1;
        });
        g.addVertex(user.id, vertexValue);
      }
    };

    // Controller functionality here
    $scope.findPath = function() {
      var g = new Graph();
      var targetUserIds = [];
      var User = supersonic.data.model('User');
      User.findAll().then(function(users) {
        for (i = 0; i < users.length; i++) {
          supersonic.logger.log(users[i].FirstName);
          if (users[i].Company == $scope.company) {
            targetIds.push(users[i].id);
          }
          addVertex(g, users[i]);
        }

        targetUserIds = computeShortestPath(userId, targetIds, g);
        for (j = 0; j < targetUserIds; j++) {
          supersonic.logger.log("uid: "+targetUserIds[j]);
          $scope.targetUsers.push(User.findAll(targetUserIds[j]));
        }
      });
    };
  });
