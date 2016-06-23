angular
			.module('ng-usermanage')
			.service('usersService', ['$http', function($http){

				this.getUsers = function() {
					return $http.get('databases/users.json');
				}

			}])
