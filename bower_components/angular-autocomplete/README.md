# AngularJS autocomplete form input directive

Uses ng-filter to create an input with a dropdown list of autocomplete suggestions (similar to a select but more free-form - you don't have to choose a value that's listed; you can still create your own)

## Demo
http://jackrabbitsgroup.github.io/angular-autocomplete/

## Dependencies
[none]

See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. download the files
	1. Bower
		1. add `"angular-autocomplete": "latest"` to your `bower.json` file then run `bower install` OR run `bower install angular-autocomplete`
2. include the files in your app
	1. `autocomplete.min.js`
	2. `autocomplete.less` OR `autocomplete.min.css` OR `autocomplete.css`
3. include the module in angular (i.e. in `app.js`) - `jackrabbitsgroup.angular-autocomplete`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation
See the `autocomplete.js` file top comments for usage examples and documentation
https://github.com/jackrabbitsgroup/angular-autocomplete/blob/master/autocomplete.js


## Development

1. `git checkout gh-pages`
	1. run `npm install && bower install`
	2. write your code then run `grunt`
	3. git commit your changes
2. copy over core files (.js and .css/.less for directives) to master branch
	1. `git checkout master`
	2. `git checkout gh-pages <%= moduleNamePart%>.js <%= moduleNamePart%>.min.js <%= moduleNamePart%>.less <%= moduleNamePart%>.css <%= moduleNamePart%>.min.css`
3. update README, CHANGELOG, bower.json, and do any other final polishing to prepare for publishing
	1. git commit changes
	2. git tag with the version number, i.e. `git tag v1.0.0`
4. create github repo and push
	1. `git remote add origin [github url]`
	2. `git push origin master` (want to push master branch first so it is the default on github)
	3. `git checkout gh-pages`
	4. `git push origin gh-pages`
5. (optional) register bower component