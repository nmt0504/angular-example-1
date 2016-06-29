angular
			.module('ng-usermanage')
			.factory('pagerService', function(){

				var service = {};

				service.getPager = getPager;

				return service;

				function getPager(totalItems, currentPage, pageSize) {
					//set current page default is 1
					currentPage = currentPage || 1;

					// set default pageSize is 10
					pageSize = pageSize || 10;

					var totalPages = Math.ceil(totalItems/pageSize);

					var startPage, endPage;
					if(totalPages <= 10) {
						startPage = 1;
						endPage = totalPages;
					} else {
						if(currentPage <= 6) {
							startPage = 1;
							endPage = 10;
						} else if (currentPage + 4 >= totalPages) {
							startPage = totalPages - 9;
							endPage = totalPages;
						} else {
							startPage = currentPage - 5;
							endPage = currentPage + 4;
						}
					}

					var startIndex = (currentPage - 1) * pageSize;
					var endIndex = startIndex + pageSize;

					var pages = range(startPage, endPage + 1);

					function range(start, stop, step) {
				    if (typeof stop == 'undefined') {
				        // one param defined
				        stop = start;
				        start = 0;
				    }

				    if (typeof step == 'undefined') {
				        step = 1;
				    }

				    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
				        return [];
				    }

				    var result = [];
				    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
				        result.push(i);
				    }

				    return result;
					}

					return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
					}
				}

			});