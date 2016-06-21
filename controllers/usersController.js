angular
			.module('ng-usermanage')
			.controller('usersController', ['$scope', 'usersFactory', 'pagerService', function($scope, usersFactory, pagerService) {
				
				$scope.users;

				usersFactory.getUsers().success(function(users){
					$scope.users = users;
					for (var i = 0; i < $scope.users.length; i++) {
						if($scope.users[i].about.length > 50) {
							$scope.users[i].substr_about = $scope.users[i].about.substr(0, 50);
							$scope.users[i].substr_about += '...';
						}
					}

					$scope.pager = {};
					$scope.setPage = setPage;

					initController();

					function initController() {
						$scope.setPage(1);
					}

					function setPage(page) {
						if(page < 1 || page > $scope.pager.totalPages) {
							return;
						}
						$scope.pager = pagerService.getPager($scope.users.length, page);

						$scope.slice_users = $scope.users.slice($scope.pager.startIndex, $scope.pager.endIndex);
					}

				}).error(function(err){
					console.log(err);
				});

			}]);