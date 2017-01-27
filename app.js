(function() {
'use strict'

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
	var ddo = {
		templateUrl: 'foundItems.html',
		scope: {
			items: '<items' 
		}
	};
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var narrow = this;
	
	narrow.searchText = "";
	narrow.found;
	
	narrow.search = function() {
		var promise = MenuSearchService.getMatchedMenuItems();
		
		if(narrow.searchText) {
			promise.then(function processItems(response) {
				narrow.found = new Array()
				for(var i = 0; i < response.data.menu_items.length; i++) {
					if(response.data.menu_items[i].description.indexOf(narrow.searchText) != -1) {
						narrow.found.push({
								index: i,
								name: response.data.menu_items[i].name
							}
						);
					}
				}
			});
		} else {
			narrow.found = new Array()		
		}
	}
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
	var service = this;

	service.getMatchedMenuItems = function() {
		var response =	$http({
				method: 'GET',
//				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
				url: 'http://localhost:8080/docs/api/menu_items.json'
			});
			
		return response;
	}
}

})();