/**
Creates an input with a dropdown list of autocomplete suggestions (similar to a select but more free-form - you don't have to choose a value that's listed; you can still create your own)

@toc
0. init
1. Setup focus & blur handlers
2. hideDropdown
3. $scope.clickDropdown
4. $scope.clickVal
5. $scope.filterVals
6. ngChange

@param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
	@param {Array} vals The values to use for auto complete matching
	@param {String} ngModel
	@param {Object} [config]
	@param {Function} [ngChange] Declared on scope so it will be "passed-through" appropriately; use as normal ng-change

@param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
	@param {String} [placeholder ='Type to search..']

@dependencies
[none]

@usage
partial / html:
<div jrg-autocomplete ng-model='formVals.myVal' vals='vals' ng-change='changeIt()'></div>

controller / js:
$scope.formVals ={
	myVal: ''
};

$scope.vals =[
	'yes',
	'no',
	'maybe',
	'so'
];

$scope.changeIt =function() {
	console.log('new val: '+$scope.formVals.myVal);
};


//end: usage
*/

'use strict';

angular.module('jackrabbitsgroup.angular-autocomplete', []).directive('jrgAutocomplete', ['$timeout', '$filter', 
function ($timeout, $filter) {

	return {
		restrict: 'A',
		scope: {
			ngModel:'=',
			vals: '=',
			config:'=?',
			ngChange: '&?'
		},

		// replace: true,
		template: function(element, attrs) {
			var defaultsAttrs ={
				placeholder: 'Type to search..'
			};
			for(var xx in defaultsAttrs) {
				if(attrs[xx] ===undefined) {
					attrs[xx] =defaultsAttrs[xx];
				}
			}
			
			var html ="<div class='jrg-autocomplete'>"+
				"<input type='text' ng-model='ngModel' ng-change='filterVals({})' placeholder='"+attrs.placeholder+"' class='jrg-autocomplete-input' />"+
				"<div ng-show='visible.dropdown' class='jrg-autocomplete-dropdown'>"+
					"<div ng-repeat='val in filteredVals' class='jrg-autocomplete-dropdown-val' ng-click='clickVal(val, {})'>{{val}}</div>"+
				"</div>"+
			"</div>";
			return html;
		},
		
		link: function(scope, element, attrs) {
		},
		
		controller: function($scope, $element, $attrs) {
			$scope.visible ={
				dropdown: false
			};
			
			$scope.filteredVals =[];
			
			var triggers ={
				clickDropdown: false
			};
			
			var timers ={
				resetClickDropdown: 400,		//must be LONGER than blurDropdown
				blurDropdown: 350,		//must be longer than click delay on mobile (300 ms?) otherwise blur will fire first and close the dropdown before the item can be clicked
				ngChange: 750		//to avoid firing ng change on each keystroke
			};
			
			var timeouts ={
				ngChange: false
			};
			
			var keycodes ={
				'enter':13,
				'tab':9
			};
			
			/**
			@toc 0.
			@method init
			*/
			function init(params) {
				$scope.filterVals({});
			}
			
			/**
			Setup focus & blur handlers on input (for hide/show dropdown)
			@toc 1.
			*/
			var ele =angular.element($element).find('input');
			ele.bind('keyup', function(evt) {
				// console.log('keyup');
				if(evt.keyCode ==keycodes.enter) {
					if($scope.filteredVals.length >0) {		//select first one
						$scope.clickVal($scope.filteredVals[0], {});
					}
				}
				else {
					$scope.filterVals({});
					$scope.visible.dropdown =true;
					//(re)set timeout for firing ng change
					if(timeouts.ngChange) {
						$timeout.cancel(timeouts.ngChange);
					}
					timeouts.ngChange =$timeout(function() {
						ngChange({});
					}, timers.ngChange);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			});
			ele.bind('focus', function(evt) {
				// console.log('focus');
				$scope.visible.dropdown =true;
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			});
			ele.bind('blur', function(evt) {
				// console.log('blur');
				$timeout(function() {
					// console.log('blur timeout done, triggers.clickDropdown: '+triggers.clickDropdown);
					if(!triggers.clickDropdown) {		//only close if didn't click on the dropdown itself
						hideDropdown({});
					}
				}, timers.blurDropdown);
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			});
			
			/**
			@toc 2.
			@method hideDropdown
			*/
			function hideDropdown(params) {
				$scope.visible.dropdown =false;
			}
			
			/**
			@toc 3.
			@method $scope.clickDropdown
			*/
			$scope.clickDropdown =function(params) {
				// console.log('clickDropdown');
				triggers.clickDropdown =true;
				//reset after timeout
				$timeout(function() {
					triggers.clickDropdown =false;
					// console.log('resetClickDropdown');
				}, timers.resetClickDropdown);
			};
			
			/**
			@toc 4.
			@method $scope.clickVal
			*/
			$scope.clickVal =function(val, params) {
				$scope.clickDropdown({});
				$scope.ngModel =val;
				hideDropdown({});
				ngChange({});
			};
			
			/**
			@toc 5.
			@method $scope.filterVals
			*/
			$scope.filterVals =function(params) {
				$scope.filteredVals =$filter('filter')($scope.vals, $scope.ngModel);
			};
			
			/**
			@toc 6.
			@method ngChange
			*/
			function ngChange(params) {
				// console.log('ngChange');
				//reset
				if(timeouts.ngChange) {
					$timeout.cancel(timeouts.ngChange);
				}
				if($scope.ngChange !==undefined) {
					//timeout first so the value is updated BEFORE change fires
					$timeout(function() {
						$scope.ngChange();
					}, 50);
				}
			}
			
			init({});
		}
	};
}]);