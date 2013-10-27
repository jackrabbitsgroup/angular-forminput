# AngularJS Form Input Builder Directive

## Demo
http://jackrabbitsgroup.github.io/angular-forminput/

## Dependencies
- required: NONE (except AngularJS of course - no jQuery, etc. or any other dependencies)
- optional
	- `font-awesome` (for next and previous arrow icons - though you can use whatever you want)
	- `less-flexbox` (for vertical centering the next and previous arrows)
		- `lesshat`
	- `angular-hammer` and `hammerjs` IF using hammer-swipe attribute for swiping to change the slide
	- `angular-multiselect` if using the multiselect input type
	- `angular-datetimepicker` if using the datetime input type
See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. download the files
	1. Bower
		1. add `"angular-forminput": "latest"` to your `bower.json` file then run `bower install` OR run `bower install angular-forminput`
2. include the files in your app
	1. forminput.min.js
	2. forminput.less
3. include the module in angular (i.e. in `app.js`) - `jackrabbitsgroup.angular-forminput`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation
See the `forminput.js` file top comments for usage examples and documentation
https://github.com/jackrabbitsgroup/angular-forminput/blob/master/forminput.js