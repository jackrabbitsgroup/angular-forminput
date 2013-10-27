/**
*/

'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	//note: not all fields have to be defined; if undefined they'll default to blank and will be set by Angular
	$scope.formVals ={
		first_name:'John',
		terms: 'yes'
	};
	
	$scope.opts ={
		ngChange: function() {$scope.onChange({}); }
	};
	
	$scope.optsPhone ={
		validationMessages: {
			pattern: 'Numbers only please!'
		}
	};
	
	$scope.selectOptsGender =[
		{val: 'male', name: 'Male'},
		{val: 'female', name: 'Female'}
	];
	
	$scope.selectOptsInterests =[
		{val: 'sports', name: 'Sports'},
		{val: 'cooking', name: 'Cooking'},
		{val: 'shows', name: 'Shows'}
	];

	$scope.onChange =function() {
		console.log('onChange fired');
	};
	
	$scope.submitForm =function() {
		if($scope.signupForm.$valid) {
			console.log('form valid');
		}
		else {
			console.log('form invalid');
		}
	};

}]);