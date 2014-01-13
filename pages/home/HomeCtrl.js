/**
*/

'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.formWideClass ='';
	
	/**
	Javascript version of media query to change form class from '' to 'wider' based on width.
	*/
	function setFormWidthClass(params) {
		// console.log(window.innerWidth);
		if(window.innerWidth >500) {
			$scope.formWideClass ='wider';
		}
		else {
			$scope.formWideClass ='';
		}
	}
	
	$timeout(function() {		//timeout to allow time for things to initialize
		window.onresize =function(evt) {
			setFormWidthClass({});
			$scope.$apply();		//get back in angular world
		}
		setFormWidthClass({});		//init
	}, 500);
	
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
	
	$scope.valsAutocomplete =[
		'yes',
		'no',
		'maybe',
		'so'
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