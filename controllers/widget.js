var CONFIG = arguments[0] || {},
	buttonElements = [],
buildButtons = function(buttons) {
	for(var i=0; i<buttons.length; i++) {
		(function(button) {
			var buttonText = Ti.UI.createLabel({
					height: "30dp",
					width: "100%",
					text: button.text || "NO TEXT PROVIDED",
					backgroundColor: button.bgColor || "#aaa",
					opacity: 0,
					borderRadius: "2.5",
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color: "#fff",
					font: {
						fontSize: "12"
					}
				});
			if(buttons.length === 2) {
				if(i === 0) {
					buttonText.width = "30%";
					buttonText.left = 0;
				} else {
					buttonText.width = "61.7%";
					buttonText.right = 0;
				}
			} else {
				if(buttons.length > 2 && parseFloat($.dialogBox.height) + 70 < parseFloat(Ti.Platform.displayCaps.platformHeight)) {
					$.dialogBox.height = parseFloat($.dialogBox.height) + 30 + "dp";
					$.dialogBoxTone2.height = parseFloat($.dialogBoxTone2.height) + 30 + "dp";
				}
				$.dialogBoxButtons.layout = "vertical";
				buttonText.bottom = "10dp";
			}
			buttonText.addEventListener("click", function() {
				if(button.clickEvent) button.clickEvent();
				if(button.shouldClose === true) close();
			});
			buttonElements.push(buttonText);
			$.dialogBoxButtons.add(buttonText);
		})(buttons[i]);
	}
},
/**
 * @method applyProperties
 * Applies customizing properties to the dialog box.
 * @param {Object}    properties Different properties to customize the dialog box
 * @param {String}   [properties.boxColor1 = "#aaa"] BackgroundColor for the first half of dialog box
 * @param {String}   [properties.boxColor2 = "#fff"] BackgroundColor for the second half of dialog box
 * @param {String}   [properties.image = ""] ImageSource for the image
 * @param {Object}    properties.label Different properties to customize the label
 * @param {String}   [properties.label.color = "#000"] Color for the label
 * @param {String}   [properties.label.text = "Click OK to continue."] Text for the label
 * @param {Object}    properties.buttons Different properties to customize the first button
 * @param {String}   [properties.buttons[i].bgColor = "#aaa"] BackgroundColor for the first button
 * @param {String}   [properties.buttons[i].color = "#fff"] Color for the second button
 * @param {String}   [properties.buttons[i].text = "OK"] Text for the first button
 * @param {Boolean}  [properties.buttons[i].shouldClose = false] Whether or not the button should close the dialog
 * @param {Function} [properties.buttons[i].clickEvent = "function() { close(); }"] Click Event for the first button
 */
applyProperties = function(properties) {
	var button1Hidden = button2Hidden = false;

	//Dialog Box properties
	$.dialogBoxTone1.backgroundColor = (properties.boxColor1)? properties.boxColor1 : '#aaa';
	$.dialogBoxTone2.backgroundColor = (properties.boxColor2)? properties.boxColor2 : '#fff';
	//Image properties
	$.dialogBoxImage.backgroundImage = (properties.image)? properties.image : WPATH('/images/no.png');
	//Label properties
	$.dialogBoxLabel.color = (properties.label && properties.label.color)? properties.label.color : '#000';
	$.dialogBoxLabel.text = (properties.label && properties.label.text !== undefined)? properties.label.text : 'Click OK to continue.';
	//Setup the buttons
	if(properties.buttons) buildButtons(properties.buttons);
},
/**
 * @method animatePulse
 * Animates increasing the width and height of an object by 25, then back to normal.
 * @param {Object} obj Titanium element to be animated.
 * @param {Function} callback Function to be executed after animation.
 * @param {Number} time_first Time it takes to do first animation.
 * @param {Number} time_second Time it takes to do second animation.
 */
animatePulse = function(obj,callback,time_first,time_second) {
	var objWidth = parseInt(obj.width),
		objHeight = parseInt(obj.height),
		animation = Ti.UI.createAnimation({
			width: objWidth + 25,
			height: objHeight + 25,
			duration: time_first
		}),
		animationHandler = function() {
			animation.removeEventListener('complete',animationHandler);
			animation.width = objWidth;
			animation.height = objHeight;
			animation.duration = time_second;
			obj.animate(animation);
			callback();
		};
	animation.addEventListener('complete',animationHandler);
	obj.animate(animation);
},
/**
 * @method animateShrink
 * Animates from 100% height and width to normal size.
 * @param {Object} obj Titanium element to be animated.
 * @param {Function} callback Function to be executed after animation.
 * @param {Number} time_first Time to wait before doing the animation.
 * @param {Number} time_second Time it takes to perform animation.
 */
animateShrink = function(obj,callback,time_first,time_second) {
	var objWidth = parseInt(obj.width),
		objHeight = parseInt(obj.height),
		animation = Ti.UI.createAnimation({
			width: objWidth,
			height: objHeight,
			duration: time_second
		}),
		animationHandler = function() {
			animation.removeEventListener('complete',animationHandler);
			callback();
		};
	obj.width = "100%";
	obj.height = "100%";
	setTimeout(function(e) {
		animation.addEventListener('complete',animationHandler);
		obj.animate(animation);
	},time_first);
},
/**
 * @method animateTV
 * Animates like a TV turning off.
 * @param {Object} obj Titanium element to be animated.
 * @param {Boolean} off True if TV turns off or false if TV turns on.
 * @param {Function} callback Function to be executed after animation.
 * @param {Number} time Time it takes to be animated.
 */
animateTV = function(obj,off,callback,time) {
	var objWidth = parseInt(obj.width),
		objHeight = parseInt(obj.height),
		animation = Ti.UI.createAnimation({
			height: (off)? "5dp" : objHeight,
			duration: time
		}),
		animationHandler = function() {
			animation.removeEventListener('complete',animationHandler);
			animation.width = (off)? "100%" : objWidth;
			obj.animate(animation);
			callback();
		};
	if(!off) {
		obj.width = "100%";
		obj.height = "5dp";
	}
	setTimeout(function(e){
		animation.addEventListener('complete',animationHandler);
		obj.animate(animation);
	},(off)? 0 : time);
},
/**
 * @method animateOpacity
 * If an object is currently opacity 0, fade it to 1, else fade to 0.
 * @param {Object} obj Titanium element to be animated.
 * @param {Number} op Number the opacity fades to.
 * @param {Number} time Time it takes to be animated.
 */
animateOpacity = function(obj,op,time) {
	var animation = Ti.UI.createAnimation({
		opacity: op,
		duration: time
	});
	obj.animate(animation);
},
/**
 * @method open
 * Opens the dialog box
 */
open = function() {
	CONFIG.parentView.add($.dialogBoxWidget);
	animateOpacity($.dimmedBackground,0.5,250);
	if(OS_ANDROID) {
		//Fade Open
		animateOpacity($.dialogBoxTone1,1,250);
		$.dialogBoxImage.opacity = 1;
		for(var i=0; i<buttonElements.length; i++) {
			buttonElements[i].opacity = 1;
		}
		$.dialogBoxLabel.opacity = 1;
	} else {
		//TV Turn On
		animateTV($.dialogBox,false,function(e) {
			setTimeout(function(e){
				animateOpacity($.dialogBoxTone1,1,500);
				animateOpacity($.dialogBoxImage,1,500);
				for(var i=0; i<buttonElements.length; i++) {
					animateOpacity(buttonElements[i],1,500);
				}
				setTimeout(function(e){
					animateOpacity($.dialogBoxLabel,1,500);
				},100);
			},100);
		},100);
	}
},
/**
 * @method close
 * Closes the dialog box
 */
close = function() {
	if(OS_ANDROID) {
		//Fade Close
		$.dialogBoxTone1.opacity = 0;
		$.dialogBoxImage.opacity = 0;
		for(var i=0; i<buttonElements.length; i++) {
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
	} else {
		//TV Turn Off
		animateTV($.dialogBox,true,function(e) {
			$.dialogBoxTone1.opacity = 0;
			$.dialogBoxImage.opacity = 0;
			for(var i=0; i<buttonElements.length; i++) {
				buttonElements[i].opacity = 0;
			}
			$.dialogBoxLabel.opacity = 0;
			setTimeout(function(e) {
				CONFIG.parentView.remove($.dialogBoxWidget);
			},100);
		},100);
	}
},
/**
 * @method init
 * If the appropriate arguments are passed in CONFIG, open dialogBox.
 */
init = function() {
	if (CONFIG.parentView) {
		if (CONFIG.properties) {
			applyProperties(CONFIG.properties);
		}
		open();
	}
};
init();