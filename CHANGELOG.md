Version numbers correspond to `bower.json` version (package.json files is NOT necessarily in sync)

# 1.1.6
## Bug Fixes
- Fix reversion bug caused by 1.1.5

# 1.1.5
## Features
- Focus input when input container div clicked

# 1.1.4
## Features
- Add `type=email` `ng-pattern` validation to ensure a '.' is required


# 1.1.3
## Features
- Add ngValidation classes on init


# 1.1.2
## Features
- Add ngBlur support

# 1.1.1
## Features
- Added character count support
- Added basic placeholder support for select inputs

# 1.1.0
## Breaking Changes
- update to Angular v1.3.0-beta.17
	- add extra quotes to `ng-true-value` and `ng-false-value` for checkbox input type
	- change `number` validation from `ng-minlength` and `ng-maxlength` to `min` and `max`

# 1.0.12
## Bug Fixes
- fix formCtrl[xx] undefined ("cannot read $valid of undefined") error

# 1.0.11
## Features
- add ng-* validation classes to outer element (for styling use - i.e. to tell if input is invalid)

# 1.0.10
## Features
- add `focused` class to outer element on focus for styling use

# 1.0.9
## Features
- add `hint` attribute for additional helper element below input (above validation)

# 1.0.8
## Features
- add `wide-icon` smaller label width

# 1.0.7
## Features
- multi-select: add loadMore function pass through support

# 1.0.6
## Features
- add angular-autocomplete directive support

# 1.0.5-1
## Features
- webkit fix/support for better validation message (not just 'required') for number input types


# 1.0.5
## Features
- generate forminput.css and forminput.min.css for non LESS support
- update dependencies
	- Angular 1.2.2
	- LESSHat and less-flexbox


# 1.0.4
## Bug Fixes
- add replace:true for new Angular 1.2.0 change to template function so there's not an extra wrapping <div> element

# 1.0.3
## Features
- update to LESSHat 2.0
- support Angular 1.2.0 - change from compile to template function

# 1.0.2
## Bug Fixes
- added ng-change support to ALL input types (previously was not working except for basic text input type)

# 1.0.0

## Features
		
## Bug Fixes

## Breaking Changes