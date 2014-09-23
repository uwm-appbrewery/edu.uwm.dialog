Dialog Box Widget
-------------------
A dialog box widget for Titanium Alloy.

Example Usage
-------------
	var dialogBox = {
		'boxtone1': '#aaa',
		'boxtone2': '#fff',
		'imagesrc': '',
		'labelcolor': '#000',
		'labeltext': 'Click OK to continue.',
		'button1bgcolor': '#aaa',
		'button1color': '#fff',
		'button1text': 'OK',
		'button1event': function() { close(); },
		'button2bgcolor': '#444',
		'button2color': '#fff',
		'button2text': 'CANCEL',
		'button2event': function() { close(); }
	};
	Alloy.createWidget('edu.uwm.dialogBox', null, {
		view: $.loginContent,
		parentView: APP.MainWindow,
		properties: dialogBox
	});

Options
-------
Parameter  | Type     | Default |
-----------|----------|---------|
view       | `View`   |         |
paretView  | `View`   |         |
properties | `Object` |         |

Properties
-------
Parameter      | Type       | Default                 |
---------------|------------|-------------------------|
boxtone1       | `String`   | '#aaa'                  |
boxtone2       | `String`   | '#fff'                  |
imagesrc       | `String`   | ''                      |
labelcolor     | `String`   | '#000'                  |
labeltext      | `String`   | 'Click OK to continue.' |
button1bgcolor | `String`   | '#aaa'                  |
button1color   | `String`   | '#fff'                  |
button1text    | `String`   | 'OK'                    |
button1event   | `Function` | function() { close(); } |
button2bgcolor | `String`   | '#444'                  |
button2color   | `String`   | '#fff'                  |
button2text    | `String`   | 'CANCEL'                |
button2event   | `Function` | function() { close(); } |

Changelog
---------
* 1.1
	* Initial commit as separate module;

License
-------

Copyright 2013 Board of Regents for University of Wisconsin System

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.