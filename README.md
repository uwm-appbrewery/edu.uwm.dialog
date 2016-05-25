Dialog Box Widget
-------------------
An alert box with customizable colors, text, and button events.

###Example Usage

```
var dialogBox = {
	'boxColor1': '#aaa',
	'boxColor2': '#fff',
	'image': '',
	'label': {
		'color': '#000',
		'text': 'Click Button 3 to Close.'
	},
	'buttons': [{
			'bgColor': '#3c676d',
			'color': '#fff',
			'text': 'Button 1',
			'shouldClose': false
		},{
			'bgColor': '#598C8E',
			'color': '#fff',
			'text': 'Button 2',
			'shouldClose': false
		},{
			'bgColor': '#4A7377',
			'color': '#fff',
			'text': 'Button 3',
			'shouldClose': true
		}]
};
Alloy.createWidget('edu.uwm.dialogBox', null, {
	parentView: APP.MainWindow,
	properties: dialogBox
});
```

###Options

Parameter    | Type         |
:-----------:|:------------:|
`paretView`  | ***View***   |
`properties` | ***Object*** |

###Properties

Parameter                | Type           | Default                 |
:-----------------------:|:--------------:|:-----------------------:|
`boxColor1`              | ***String***   | '#aaa'                  |
`boxColor2`              | ***String***   | '#fff'                  |
`image`                  | ***String***   | ''                      |
`label`                  | ***Object***   |                         |
`label.color`            | ***String***   | '#000'                  |
`label.text`             | ***String***   | 'Click OK to continue.' |
`buttons[i]`             | ***Array***    |                         |
`buttons[i].bgColor`     | ***String***   | '#aaa'                  |
`buttons[i].color`       | ***String***   | '#fff'                  |
`buttons[i].text`        | ***String***   | 'OK'                    |
`buttons[i].shouldclose` | ***Boolean***  | false                   |
`buttons[i].clickEvent`  | ***Function*** | function() { close(); } |

###Animation Examples
Fade Open
```
animateOpacity($.dialogBoxTone1,1,250);
$.dialogBoxImage.opacity = 1;
for(var i=0; i < buttonElements.length; i++) {
	buttonElements[i].opacity = 1;
}
$.dialogBoxLabel.opacity = 1;
```
Fade Close
```
$.dialogBoxTone1.opacity = 0;
$.dialogBoxImage.opacity = 0;
for(var i=0; i < buttonElements.length; i++) {
	buttonElements[i].opacity = 0;
}
$.dialogBoxLabel.opacity = 0;
animateOpacity($.dialogBox,0,200);
setTimeout(function(e) {
	animateOpacity($.dimmedBackground,0,250);
	setTimeout(function(e) {
		CONFIG.parentView.remove($.dialogBoxWidget);
	},250);
},200);
```
TV Turn On
```
animateTV($.dialogBox,false,function(e) {
	setTimeout(function(e){
		animateOpacity($.dialogBoxTone1,1,500);
		animateOpacity($.dialogBoxImage,1,500);
		for(var i=0; i < buttonElements.length; i++) {
			animateOpacity(buttonElements[i],1,500);
		}
		setTimeout(function(e){
			animateOpacity($.dialogBoxLabel,1,500);
		},100);
	},100);
},100);
```
TV Turn Off
```
animateTV($.dialogBox,true,function(e) {
	$.dialogBoxTone1.opacity = 0;
	$.dialogBoxImage.opacity = 0;
	for(var i=0; i < buttonElements.length; i++) {
		buttonElements[i].opacity = 0;
	}
	$.dialogBoxLabel.opacity = 0;
	setTimeout(function(e) {
		CONFIG.parentView.remove($.dialogBoxWidget);
	},100);
},100);
```
Pulse Open
```
animatePulse($.dialogBox,function(e) {
	setTimeout(function(e){
		animateOpacity($.dialogBoxTone1,1,500);
		animateOpacity($.dialogBoxImage,1,500);
		for(var i=0; i < buttonElements.length; i++) {
			buttonElements[i].opacity = 1;
		}
		setTimeout(function(e){
			animateOpacity($.dialogBoxLabel,1,500);
		},100);
	},100);
},100,250);
```
Fullscreen Shrink
```
$.dialogBox.opacity = 0;
animateOpacity($.dialogBox,1,250);
animateShrink($.dialogBox,function(e) {
	setTimeout(function(e){
		animateOpacity($.dialogBoxTone1,1,500);
		animateOpacity($.dialogBoxImage,1,500);
		for(var i=0; i < buttonElements.length; i++) {
			animateOpacity(buttonElements[i],1,500);
		}
		setTimeout(function(e){
			animateOpacity($.dialogBoxLabel,1,500);
		},100);
	},100);
},100,250);
```

###Changelog

* 1.1
	* Initial commit
* 1.2
	* Added Animations
* 1.3
	* Made Android specific animations that are simpler
* 1.4
	* Allowed for more than 2 buttons to be displayed

###License

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