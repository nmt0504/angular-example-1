angular
			.module('ng-usermanage')
			.controller('usersController', ['$scope', 'usersService', 'pagerService', 'ngDialog', function($scope, usersService, pagerService, ngDialog) {
				
				$scope.users = [];

				usersService.getUsers().success(function(users){
					$scope.users = users;
					console.log($scope.users);
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

					// Create form for add user
					$scope.openNewUserDialog = function () {
						ngDialog.open({
							template: 'templates/new_user_dialog.html',
							className: 'ngdialog-theme-default',
							scope: $scope
						});
					}

					var isNotEmpty = function(someObject) {
						return !angular.equals(someObject, {});
					}

					// Add user function 
					$scope.newUser = {};
					$scope.addUser = function(newUser) {
						if(isNotEmpty(newUser)) {
							$scope.users.push(newUser);
							$scope.newUser = {};	
							ngDialog.closeAll();
							$scope.setPage($scope.pager.totalPages);
						} else {
							alert("Data is empty");
							console.log("Data is empty");
						}
					}

			
				}).error(function(err){
					console.log(err);
				});

			}])
