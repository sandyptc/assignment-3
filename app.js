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
		narrow.found = new Array()
		var promise = MenuSearchService.getMatchedMenuItems();
		
		promise.then(function processItems(response) {
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
	}
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
	var service = this;

	service.getMatchedMenuItems = function(searchTest) {
		var response =	$http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			});
			
		return response;
	}
}

})();