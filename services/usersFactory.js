angular
			.module('ng-usermanage')
			.factory('usersFactory', ['$http', function($http){

				function getUsers() {
					return $http.get('databases/users.json');
				}
				
				return {
					getUsers: getUsers
				};

			}])
