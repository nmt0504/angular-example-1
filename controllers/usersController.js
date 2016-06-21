angular
			.module('ng-usermanage')
			.controller('usersController', ['$scope', 'usersFactory', function($scope, usersFactory){
				
				$scope.users;

				usersFactory.getUsers().success(function(users){
					$scope.users = users;
					for (var i = 0; i < $scope.users.length; i++) {
						if($scope.users[i].about.length > 50) {
							$scope.users[i].substr_about = $scope.users[i].about.substr(0, 50);
							$scope.users[i].substr_about += '...';
						}
					}
				}).error(function(err){
					console.log(err);
				});

			}]);