/**
NOTE: as of Angular v1.3.0-rc.3, 'ng-maxlength' doesn't validate properly so use 'maxlength' instead!

@todo
- checkbox - allow true/false values to be specified in scope (rather than just attrs)
- add specific input type directives to be included here (checkbox, etc.)
- add more/customized validation
- bug fix / figure out why Angular 1.2.0rc3 no longer sets form validity properly even though all inputs are valid.. worked in Angular 1.1.5 - maybe due to changing priority? I removed priority and transclude and it still worked so maybe without those, it will work again? Need to test/try it..

Adds consistent layout (inluding input labels) and styling to an input element so groups of inputs all look the same. Also adds validation. Basically makes it faster and easier to build forms by making it just 1 line of directive code in your partial (rather than several) to create a full, nice looking input.
This directive is typically NOT meant to be used with just one input by itself or for a group of inputs that do NOT have a lot in common - since the whole point of this directive is to make a GROUP of inputs look the same.

SUPPORTED INPUT TYPES:
text, email, tel, number, url,
password,
textarea,
autocomplete,
select, multi-select,
date, datetime,
checkbox
NOT YET SUPPORTED INPUT TYPES:
multiCheckbox,
slider,
file/image?,
datetime-local??, time?

@dependencies
- jrg-autocomplete directive (for autocomplete input type only)
- jrg-multiselect directive (for multi-select input type only)
- jrg-datetimepicker directive (for datetime input type only)

@toc
0. fromCtrl - validation and over-writing / setting $valid since it's not working after upgrade to Angular 1.2..
	0.5. scope.$watch('ngModel',..
1. init
2. initSelect
3. initSelectModel
4. initSelectOpts
5. $scope.$watch('ngModel',..

scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html)
	@param {String} ngModel Variable for storing the input's value
	@param {Object} opts
		@param {Function} [ngChange] Will be called AFTER the value is updated. NOT supported for date/datetime input types (use onchangeDatetime instead). NOTE: this will NOT fire if the value is invalid (will fire though after the value is valid).
		@param {Object} [validationMessages] Key-value pairs of validation messages to display (i.e. {minlength: 'Too short!'} )
	@param {Array} [valsAutocomplete] REQUIRED for 'autocomplete' type. Array of strings to auto complete with.
	@param {Array} [selectOpts] REQUIRED for 'select' and 'multi-select' type. These are options for the <select>. Each item is an object of:
		@param {String} val Value of this option. NOTE: this should be a STRING, not a number or int type variable. Values will be coerced to 'string' here but for performance and to ensure accurate display, pass these in as strings (i.e. 1 would become '1'). UPDATE: they may not actually have to be strings but this type coercion ensures the ngModel matches the options since 1 will not match '1' and then the select value won't be set properly. So basically types need to match so just keep everything in strings. Again, ngModel type coercion will be done here but it's best to be safe and just keep everything as strings.
		@param {String} name text/html to display for this option
	// @param {Object} [checkboxVals] CHECKBOX type only. True and false values:
		// @param {String} [ngTrueValue =1] The value the ngModel will be equal to if the checkbox is checked
		// @param {String} [ngFalseValue =0] The value the ngModel will be if the checkbox is NOT checked
	@param {Object} [optsDatetime] DATE/DATETIME type only. Opts that will be passed through to jrg-datetimepicker directive (see there for full documentation)
	@param {Function} [validateDatetime] DATE/DATETIME type only. Will be called everytime date changes PRIOR to setting the value of the date. Will pass the following parameters:
		@param {String} date
		@param {Object} params
		@param {Function} callback Expects a return of {Boolean} true if valid, false otherwise. If false, the value will be set to blank.
	@param {Function} [onchangeDatetime] DATE/DATETIME type only. Will be called everytime date changes. NOTE: this REPLACES opts.ngChange, which will NOT fire on date/datetime input types! Will pass the following parameters:
		@param {String} date
		@param {Object} params
	@param {Function} ngClick Declared on scope so it will be "passed-through" appropriately; use as normal ng-click
	@param {Function} ngBlur Declared on scope so it will be "passed-through" appropriately; use as normal ng-blur

attrs
	@param {String} [type ='text'] Input type, one of the types listed at the top
	@param {String} [class =''] Class to give to outermost element
	@param {String} [id ='[random string]'] Id for this input
	@param {String} [placeholder =''] Placeholder text for input (defaults to attrs.label if placeholder is not defined)
	@param {String} [label =''] Text for <label> (defaults to attrs.placeholder if label is not defined)
	@param {Number} [noLabel] Set to 1 to not show label
	@param {String} [hint =''] Hint text to go below input
	@param {String} [charCount] Text to place in character count div (which is between input div and hint div, but exists only if this attribute is defined). Use the special string '$$length' for the length of the input. This attribute is for display purposes only. Intended for use with text and textarea inputs.
		@example char-count = '$$length / 100 characters' would display as '17 / 100 characters', if the user has typed 17 characters in the input. Known bug: trailing spaces are not counted in the length value. It's as if Angular ignores trailing spaces on the ng-model expression - it doesn't update.
	

@usage
NOTE: for validation to work, a <form> with a 'name' attribute is required to be wrapped around the inputs (you can put multiple inputs inside the same <form> tag of course!)

//1. text/default input (or password, textarea, email, tel, number, url - just change 'type' appropriately)
partial / html:
<form name='myForm'>
	<div jrg-forminput type='text' placeholder='Title' ng-model='formVals.title' opts='opts'></div>
</form>

controller / js:
$scope.formVals ={
	title:'test title here'
};
$scope.opts ={
	ngChange: function() {$scope.searchTasks({}); }
};

$scope.searchTasks =function() {
	//do something
};




//1.5 autocomplete
partial / html:
<form name='myForm'>
	<div jrg-forminput type='autocomplete' placeholder='Title' vals-autocomplete='valsAutocomplete' ng-model='formVals.title' opts='opts'></div>
</form>

controller / js:
$scope.formVals ={
	title:'test title here'
};
$scope.valsAutocomplete =[
	'yes',
	'no',
	'maybe',
	'so'
];
$scope.opts ={
	ngChange: function() {$scope.searchTasks({}); }
};

$scope.searchTasks =function() {
	//do something
};



//2. select, multi-select
partial / html:
<form name='myForm'>
	<div jrg-forminput type='multi-select' placeholder='Tags' ng-model='formVals.tags' select-opts='selectOptsTags' opts=''></div>
</form>

controller / js:
$scope.formVals ={
	tags: ''
};

$scope.selectOptsTags =[
	{val: '1', name: 'one'},
	{val: 'yes', name: 'Yes'},
	{val: '83lksdf', name: 'John Smith'}
];



//3. date, datetime
partial / html:
<form name='myForm'>
	<div jrg-forminput type='datetime' placeholder='Date/Time' ng-model='formVals.due_date' opts=''></div>
</form>

controller / js:
$scope.formVals ={
	due_date: ''
};



//4. checkbox
partial / html:
<form name='myForm'>
	<div jrg-forminput type='checkbox' ng-model='formVals.checkVal' ng-true-value='"yes"' ng-false-value='"off"' opts=''></div>
</form>

controller / js:
$scope.formVals ={
	checkVal: 'yes'
};




//end: usage
*/

'use strict';

angular.module('jackrabbitsgroup.angular-forminput', []).directive('jrgForminput', ['$timeout', function ($timeout) {
  return {
		restrict: 'A',
		//NOTE: transclude and terminal don't play nice together and those plus priority are finicky; I don't really understand it, but in order for BOTH the $scope.form.$valid to be accurate AND the ngModel to carry through, need:
		//transclude: true, terminal: false
		// transclude: true,	//NOTE: this does NOT work the same with "terminal" set, so after to use "transclude" function instead of ng-transclude..		//NOTE: this apparently is REQUIRED even if not using transclude..		//UPDATE: 2013.11.11 - apparently NOT needed (anymore)?
		// priority:100,		//we need this AND terminal - otherwise the form will not be $valid on submit (priority 100 so this will happen before ngModel)		//UPDATE: 2013.11.11 - apparently NOT needed (anymore)?
		//terminal: true,		//can NOT be set otherwise ngModel value will be blank / not accurrate		//we need this AND priority - otherwise the form will not be $valid on submit
		scope: {
			ngModel:'=',
			opts:'=?',		//supported on v1.1 versions (but not on stable releases of AngularJS yet (as of 2013.04.30))
			// opts:'=',
			valsAutocomplete: '=',
			selectOpts:'=',
			optsDatetime: '=?',
			// checkboxVals: '=?',
			validateDatetime: '&?',
			onchangeDatetime: '&?',
			ngClick: '&?',
			ngBlur: '&?',
			loadMore: '&?'
		},
		require: '?^form',		//if we are in a form then we can access the formController (necessary for validation to work)

		replace: true,
		template: function(element, attrs) {
			if(!attrs.type) {
				attrs.type ='text';		//default
			}
			
			var defaults ={'noLabel':0};
			for(var xx in defaults) {
				if(attrs[xx] ===undefined) {
					attrs[xx] =defaults[xx];
				}
			}
			var attrsToInt =['noLabel'];
			for(var ii=0; ii<attrsToInt.length; ii++) {
				attrs[attrsToInt[ii]] =parseInt(attrs[attrsToInt[ii]], 10);
			}
			
			var classes =attrs.class || '';
			var placeholder =attrs.placeholder || attrs.label || '';
			var label =attrs.label || attrs.placeholder || '';
			var hint =attrs.hint || '';
			
			//was going to try to put html in templates but since don't have access to scope in compile function, there's no way to set dynamic values, which is the whole point of this directive.. Plus it's better for performance to just have things here, even though it breaks the "separation of html and javascript" convention..
			// $http.get('template/' + template + '.html', {cache:$templateCache}).then(function(response) {
			// });
			var html ={
				label: '',
				input: '',
				hint: '',
				validation: '',
				character_count: ''
			};
			if(label && !attrs.noLabel) {
				html.label ="<label>"+label+"</label>";
			}
			if(hint) {
				html.hint ="<div class='jrg-forminput-hint'>"+hint+"</div>";
			}
			
			//copy over attributes
			var customAttrs ='';		//string of attrs to copy over to input
			var skipAttrs =['jrgForminput', 'ngModel', 'label', 'type', 'placeholder', 'hint', 'opts', 'name', 'optsDatetime', 'validateDatetime', 'onchangeDatetime', 'checkboxVals', 'ngClick', 'ngBlur', 'charCount'];
			angular.forEach(attrs, function (value, key) {
				if (key.charAt(0) !== '$' && skipAttrs.indexOf(key) === -1) {
					customAttrs+=attrs.$attr[key];
					if(attrs[key]) {
						//need to add extra quotes for ng-true-value and ng-false-value AND match single quotes vs double quotes - https://github.com/angular/angular.js/blob/master/CHANGELOG.md#breaking-changes-2
						if(key =='ngTrueValue' || key =='ngFalseValue') {
							if(attrs[key].indexOf('"') >-1) {
								customAttrs+='=\''+attrs[key]+'\'';
							}
							else {
								customAttrs+='=\"'+attrs[key]+'\"';
							}
						}
						else {
							customAttrs+='='+attrs[key];
						}
					}
					customAttrs+=' ';
				}
			});
			
			/**
			setting the name and scope variables can be a little tricky..
			- First I tried with name='"+attrs.name+"' but that doesn't work inside ng-repeat tags since there's only ONE compile function so ALL inputs have the SAME name (and id), which is no good
			- So we MUST reset unique attributes (the name/id) in the link function with a NEW (and this time ACTUALLY unique) value so then I used scope with name='{{name}}' and that worked to correctly ensure uniqueness BUT then the validation stopped working since the formCtrl is outdated and only has ONE '{{name}}' key..
			- So now we're setting BOTH a unique id up top here in the compile function (for the fromCtrl validation to work properly) AND then overwriting it in the link function AND overwriting the formCtrl keys as well.. This is the only way I could get BOTH unique name/id attributes AND get the validation to work (i.e. have formCtrl have the proper keys)..
			The `elementTag` variable set here is for .find() later in the link function for updating the name attribute on the proper element
			*/
			var uniqueName ="jrgFormInput"+attrs.type+Math.random().toString(36).substring(7);
			var elementTag ='input';
			var elementTagEvt ='input';		//the tag for the event binding (i.e. focus or blur) may be different
			if(attrs.type =='text' || attrs.type =='email' || attrs.type =='tel' || attrs.type =='number' || attrs.type =='url') {
				html.input ="<input class='jrg-forminput-input' name='"+uniqueName+"' ng-model='ngModel' ng-change='onchange({})' type='"+attrs.type+"' placeholder='"+placeholder+"' "+customAttrs+" ";
				if(attrs.type =='email') {
					html.input +="ng-pattern='/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z0-9]{2,4}/' ";
				}
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				html.input+="/>";
			}
			else if(attrs.type =='password') {
				html.input ="<input class='jrg-forminput-input' name='"+uniqueName+"' ng-model='ngModel' ng-change='onchange({})' type='password' placeholder='"+placeholder+"' "+customAttrs+" ";
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				html.input+="/>";
			}
			else if(attrs.type =='textarea') {
				elementTag ='textarea';
				elementTagEvt ='textarea';
				html.input ="<textarea class='jrg-forminput-input' name='"+uniqueName+"' ng-model='ngModel' ng-change='onchange({})'  placeholder='"+placeholder+"' "+customAttrs+" ";
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				html.input+="></textarea>";
			}
			else if(attrs.type =='checkbox') {
				// html.input ="<input class='jrg-forminput-input' name='"+uniqueName+"' ng-model='ngModel' ng-change='onchange({})'  type='checkbox' placeholder='"+placeholder+"' "+customAttrs+" />";
				//doesn't work - apparently can't set ng-true-value and ng-false-value via scope...
				// html.input ="<div class='jrg-forminput-input jrg-forminput-input-checkbox-cont'><input class='jrg-forminput-input-checkbox' name='"+uniqueName+"' ng-model='ngModel' ng-change='onchange({})'  ng-true-value='{{checkboxVals.ngTrueValue}}' ng-false-value='{{checkboxVals.ngFalseValue}}' type='checkbox' placeholder='"+placeholder+"' "+customAttrs+" /></div>";
				html.input ="<div class='jrg-forminput-input jrg-forminput-input-checkbox-cont'><input class='jrg-forminput-input-checkbox' name='"+uniqueName+"' ng-model='ngModel' ng-change='onchange({})' type='checkbox' placeholder='"+placeholder+"' "+customAttrs+" ";
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				html.input+="/></div>";
			}
			else if(attrs.type =='autocomplete') {
				elementTag ='div';
				html.input ="<div class='jrg-forminput-input'><div name='"+uniqueName+"' jrg-autocomplete ng-change='onchange({})' ng-model='ngModel' vals='valsAutocomplete' placeholder='"+placeholder+"' config='opts' "+customAttrs+" ";
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				html.input+="></div></div>";
			}
			else if(attrs.type =='select') {
				elementTag ='select';
				elementTagEvt ='select';
				html.input ="<select class='jrg-forminput-input' name='"+uniqueName+"' ng-model='ngModel' ng-change='onchange({})' "+customAttrs+" ng-options='opt.val as opt.name for opt in selectOpts' ";
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				html.input+=">";
				if(placeholder && placeholder.length > 0) {
					html.input+="<option value='' disabled selected>" + placeholder + "</option>";
				}
				html.input+="</select>";
			}
			else if(attrs.type =='multi-select') {
				elementTag ='div';
				html.input ="<div class='jrg-forminput-input'><div name='"+uniqueName+"' jrg-multiselect select-opts='selectOpts' ng-model='ngModel' config='opts' ";
				//NOTE: no customAttrs here..		//@todo - add them??
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				if(attrs.loadMore) {
					html.input +="load-more='loadMoreWrapper' ";
				}
				//add onchange / ng-change handling (multi-select directive uses 'on-change-evt' attr rather than ng-change)
				attrs.onChangeEvt =uniqueName+'MultiSelectOnChange';
				html.input +="on-change-evt='"+attrs.onChangeEvt+"' ";
				html.input+="></div></div>";
			}
			else if(attrs.type =='date' || attrs.type =='datetime') {
				elementTag ='div';
				html.input ="<div class='jrg-forminput-input' name='"+uniqueName+"' jrg-datetimepicker opts='optsDatetime' ng-model='ngModel'  placeholder='"+placeholder+"' "+customAttrs;
				if(attrs.validateDatetime) {
					html.input +="validate='validateDatetime' ";
				}
				if(attrs.onchangeDatetime) {
					html.input +="onchange='onchangeDatetime' ";
				}
				if(attrs.ngClick) {
					html.input +="ng-click='ngClick()' ";
				}
				if(attrs.ngBlur) {
					html.input +="ng-blur='ngBlur()' ";
				}
				html.input+=">";
				html.input+="</div>";
			}
			
			//Character Count
			if(attrs.charCount)
			{
				html.character_count = "<div class = 'jrg-forminput-char-count'>" + attrs.charCount.replace('$$length', "{{ngModel.length || '0'}}") + "</div>";
			}
			
			//validation
			//'track by $id($index)' is required for Angular >= v1.1.4 otherwise will get a 'duplicates in a repeater are not allowed' error; see here for this solution: http://mutablethought.com/2013/04/25/angular-js-ng-repeat-no-longer-allowing-duplicates/
			html.validation ="<div class='jrg-forminput-validation text-error' ng-repeat='(key, error) in field.$error track by $id($index)' ng-show='error && field.$dirty' class='help-inline'>{{opts1.validationMessages[key]}} <span ng-show='!opts1.validationMessages[key]'>Invalid</span></div>";		//generic "Invalid" error message if message for this key doesn't exist
			
			var htmlFull ="<div class='jrg-forminput-cont {{classes.focus}} {{classes.ngValidation}}'><div class='jrg-forminput'>" + html.label + html.input + "</div>" + html.character_count + html.hint + html.validation + "</div>";
			
			//save on attrs for use later
			attrs.elementTag =elementTag;
			attrs.elementTagEvt =elementTagEvt;
			attrs.uniqueName =uniqueName;
			
			return htmlFull;
		},
			
		link: function(scope, element, attrs, formCtrl) {
		
			// console.log('scope.ngModel: '+scope.ngModel);
			// $compile(angular.element(element))(scope);
			
			//if was in an ng-repeat, they'll have have the same compile function so have to set the id here, NOT in the compile function (otherwise they'd all be the same..)
			if(attrs.id ===undefined) {
				attrs.id ="jrgFormInput"+attrs.type+Math.random().toString(36).substring(7);
			}
			if(!attrs.name) {
				attrs.name =attrs.id;
			}
			scope.id =attrs.id;
			scope.name =attrs.name;
			
			var selector =attrs.elementTag+'.jrg-forminput-input';		//not working (anymore?)??
			selector =attrs.elementTag;
			
			//update the OLD name with the NEW name
			element.find(selector).attr('name', attrs.name);
			
			/**
			@property scope.classes Used to change classes on elements (i.e. on focus/blur)
			@type Object
			*/
			scope.classes ={
				focus: '',
				ngValidation: ''
			};
			
			//add on focus (& blur) handler
			var selectorEvt =attrs.elementTagEvt;
			angular.element(element.find(selectorEvt)).on('focus', function(evt) {
				scope.$apply(function() {
					scope.classes.focus ='focused';
				});
			});
			element.find(selectorEvt).bind('blur', function(evt) {
				scope.$apply(function() {
					scope.classes.focus ='';		//reset
				});
			});
			//Focus inner element on outer element focus
			angular.element(element).on('click', function(evt)
			{
				if(element.find(selectorEvt)[0] && element.find(selectorEvt)[0].focus)
				{
					element.find(selectorEvt)[0].focus();
				}
			});
			angular.element(element).on('touch', function(evt)
			{
				if(element.find(selectorEvt)[0] && element.find(selectorEvt)[0].focus)
				{
					element.find(selectorEvt)[0].focus();
				}
			});
			
			function setNgValidationClasses(params) {
				var classes =angular.element(element.find(selectorEvt)).attr('class');
				//only copy over the ng-* classes
				var classesArr =classes.match(/ng-(\S+)/g);
				//avoid errors
				if(!classesArr) {
					classesArr =[];
				}
				classes =classesArr.join(' ');
				scope.classes.ngValidation =classes;
			}
			
			//copy over classes from input to outer container (for styling - they seem to already be copied over AFTER enter a valid value once, but need them if the initial value is invalid too)
			//add keyup handler for adding angular validation classes
			// var selectorEvt =attrs.elementTagEvt;
			angular.element(element.find(selectorEvt)).on('keyup', function(evt) {
				scope.$apply(function() {
					setNgValidationClasses({});
				});
			});
			
			setNgValidationClasses({});
			
			/*
			//NOT WORKING..
			//if was in an ng-repeat, they'll all have the same id's so need to re-write the html with new unique id's..
			if(scope.$parent.$index !=undefined) {		//ng-repeat has $parent.$index so use this to test
				var oldId =attrs.id;		//save for replacing later
				attrs.id ="jrgFormInput"+attrs.type+Math.random().toString(36).substring(7);		//overwrite with new one (link function is run per each item so this will generate new id's for EACH instance, which is what we want to ensure uniqueness)
				
				var newHtml =element.html().replace(new RegExp(oldId,"gm"), attrs.id);
				element.html(newHtml);
				$compile(angular.element(element))(scope);
			}
			*/
			
			/*
			//do NOT do this anymore with move to template function / angular 1.2.0
			if(attrs.type =='multi-select' || attrs.type =='date' || attrs.type =='datetime') {
				$compile(angular.element(element))(scope);
			}
			*/
			
			if(attrs.type =='checkbox') {
				/*
				//doesn't work - apparently can't set ng-true-value and ng-false-value via scope... 
				var defaultCheckboxVals ={
					ngTrueValue: '1',
					ngFalseValue: '0'
				};
				scope.checkboxVals =angular.extend(defaultCheckboxVals, scope.checkboxVals);
				*/
				//force to string (otherwise won't match properly and won't start checked even if ngModel equals the integer value of the ng-true-value)
				if(scope.ngModel !==undefined) {
					scope.ngModel =scope.ngModel.toString();
				}
			}
			
			/**
			@toc 0.
			*/
			//set up validation
			if(formCtrl) {
				//copy over the OLD unique name to the NEW unique name then delete the old one (since at this point, formCtrl is outdated/has bad info since the name of the input has CHANGED)
				formCtrl[attrs.name] =formCtrl[attrs.uniqueName];
				delete formCtrl[attrs.uniqueName];
				//set the scope.field value equal to the formCtrl input handle for validation to work
				scope.field =formCtrl[attrs.name];
				
				/**
				Unfortunately Angular 1.2 no longer properly sets form validity (worked in Angular 1.1.5) so have to watch each input and check all of them on each change - if they're all valid, set the form to valid - @todo - fix this so can get rid of the $watch, which is performance intensive and shouldn't be necessary..
				@toc 0.5.
				@method scope.$watch('ngModel',..
				*/
				scope.$watch('ngModel', function(newVal, oldVal) {
					if(!angular.equals(oldVal, newVal)) {		//very important to do this for performance reasons since $watch runs all the time
						// console.log('formCtrl.$valid: '+formCtrl.$valid);
						var xx, valid =true;
						for(xx in formCtrl) {
							if(xx[0] !=='$') {		//skip angular / non-input fields and avoid errors
								if(formCtrl[xx].$valid !==undefined && formCtrl[xx].$valid !==true) {
									valid =false;
									break;
								}
							}
						}
						// console.log('valid: '+valid);
						// formCtrl.$setValidity(valid);		//not working / throwing an error the first time we try to set it to true
						formCtrl.$valid =valid;
						formCtrl.$invalid =!valid;
						// console.log('formCtrl.$valid 2: '+formCtrl.$valid);
					}
				});
		
			}
		},
		controller: function($scope, $element, $attrs) {
			$scope.opts1 ={};		//can't use $scope.opts in case it's not defined/set otherwise get "Non-assignable model expression.." error..
			var defaultOpts ={
				validationMessages: {
					required: 'Required!',
					minlength: 'Too short!',
					maxlength: 'Too long!',
					pattern: 'Invalid characters!',
					email: 'Invalid email',
					number: 'Must be a number!'
				}
			};
			//fix for webkit where type='number' inputs just clear the value on invalid characters so we see the (wrong) required error message rather than a more descriptive/accurate 'must be a number' or 'invalid characters' error messages
			if($attrs.type =='number') {
				defaultOpts.validationMessages.required ='Must be a valid number!';
			}
			
			if(!$scope.opts || $scope.opts ===undefined) {
				$scope.opts1 =defaultOpts;
			}
			else {		//extend defaults
				var xx;
				for(xx in defaultOpts) {
					if($scope.opts[xx] && $scope.opts[xx] !==undefined) {
						$scope.opts1[xx] =angular.extend(defaultOpts[xx], $scope.opts[xx]);
					}
					else {
						$scope.opts1[xx] =defaultOpts[xx];
					}
				}
			}
			
			
			if($scope.opts && $scope.opts.ngChange) {
				$scope.onchange =function(params) {
					//timeout first so the value is updated BEFORE change fires
					$timeout(function() {
						$scope.opts.ngChange();
					}, 50);
				};
				
				//multiselect handling (uses attr event broadcast/emit instead)
				if($attrs.onChangeEvt) {
					$scope.$on($attrs.onChangeEvt, function(evt, params) {
						$scope.opts.ngChange();
					});
				}
			}
			
			//datetime set default opts
			if($attrs.type =='date' || $attrs.type =='datetime') {
				if($scope.optsDatetime ===undefined || !$scope.optsDatetime) {
					$scope.optsDatetime ={
						pikaday: {}
					};
				}
				if($attrs.type =='datetime') {
					$scope.optsDatetime.pikaday.showTime =true;
				}
			}
			
			//set up some function that need to be passed through (apparently can't easily do it.. have to make another outer wrapper here..)
			if($attrs.type =='multi-select') {
				if($scope.loadMore !==undefined) {
					$scope.loadMoreWrapper =function(params, callback) {
						$scope.loadMore()(params, callback);
					};
				}
			}
			
			
			/**
			@toc 1.
			@method init
			*/
			function init(params) {
				if($attrs.type =='select' || $attrs.type =='multiSelect') {
					initSelect({});
				}
			}
			
			/**
			<select> opts must be STRINGS otherwise they won't work properly (number values will just have 0, 1, 2, etc. as values). UPDATE: this may not actually be true - inspecting the HTML will always show "value='0'" "value='1'" for the select option values but they should still work properly. What IS important is that types match between the option values and the ngModel. Thus we're not type forcing ngModel to be a string to ensure they both match.
			@toc 2.
			@method initSelect
			*/
			function initSelect(params) {
				initSelectModel({});
				initSelectOpts({});
			}
			
			/**
			@toc 3.
			@method initSelectModel
			*/
			function initSelectModel(params) {
				if($scope.ngModel !==undefined && typeof($scope.ngModel) !=='string') {		//NOTE: MUST first check that ngModel is not undefined since otherwise converting to string will cause errors later
					$scope.ngModel =$scope.ngModel.toString();		//ensure BOTH ngModel and options are both strings
				}
			}
			
			/**
			@toc 4.
			@method initSelectOpts
			*/
			function initSelectOpts(params) {
				var ii;
				for(ii =0; ii<$scope.selectOpts.length; ii++) {
					if(typeof($scope.selectOpts[ii].val) =='number') {
						$scope.selectOpts[ii].val =$scope.selectOpts[ii].val.toString();
					}
					else {		//assume they're all the same format so if find one non-number, break (for performance reasons)
						// break;
						var dummy =1;		//breaking isn't a safe assumption - may have default string value and the rest are numbers..
					}
				}
			}
			
			/**
			@toc 5.
			*/
			$scope.$watch('ngModel', function(newVal, oldVal) {
				if(!angular.equals(oldVal, newVal)) {		//very important to do this for performance reasons since $watch runs all the time
					//if ngModel changes, have to ensure it's a string - otherwise the currently selected value will NOT be selected (it will just show the blank top option as selected)
					if($attrs.type =='select' || $attrs.type =='multiSelect') {
						initSelectModel({});
					}
				}
			});
			
			init({});		//init the first time
		}
	};
}])
;