# AngularJS Form Input Builder Directive

Provides consistent, responsive styling and validation for forms/inputs. Build a form quickly with 1 line per input in your HTML rather than copy/paste for a label, input, validation, and styling for each input control.

## Demo
http://jackrabbitsgroup.github.io/angular-forminput/

## Dependencies

- optional
	- `lesshat`
	- `less-flexbox`
	- `angular-autocomplete` if using the autocomplete input type
	- `angular-multiselect` if using the multi-select input type
	- `angular-datetimepicker` if using the datetime or date input types

See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. download the files
	1. Bower
		1. add `"angular-forminput": "latest"` to your `bower.json` file then run `bower install` OR run `bower install angular-forminput`
2. include the files in your app
	1. forminput.min.js
	2. forminput.less OR forminput.min.css OR forminput.css
3. include the module in angular (i.e. in `app.js`) - `jackrabbitsgroup.angular-forminput`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation
See the `forminput.js` file top comments for usage examples and documentation
https://github.com/jackrabbitsgroup/angular-forminput/blob/master/forminput.js


## Development

1. `git checkout gh-pages`
	1. run `npm install && bower install`
	2. write your code then run `grunt`
	3. git commit your changes
2. copy over core files (.js and .css/.less for directives) to master branch
	1. `git checkout master`
	2. `git checkout gh-pages forminput.js forminput.min.js forminput.less forminput.css forminput.min.css`
3. update README, CHANGELOG, bower.json, and do any other final polishing to prepare for publishing
	1. git commit changes
	2. git tag with the version number, i.e. `git tag v1.0.0`
4. create github repo and push
	1. [if remote does not already exist or is incorrect] `git remote add origin [github url]`
	2. `git push origin master --tags` (want to push master branch first so it is the default on github)
	3. `git checkout gh-pages`
	4. `git push origin gh-pages`
5. (optional - ONLY FIRST TIME; otherwise pushing a new git tag to `master` branch will auto update!) register bower component
	1. `bower register angular-forminput [git repo url]`
