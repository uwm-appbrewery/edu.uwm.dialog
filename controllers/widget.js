var CONFIG = arguments[0] || {};

if (CONFIG.view && CONFIG.parentView) {
	if (CONFIG.properties) {
		applyProperties(CONFIG.properties);
	}
	open();
}

/**
 * @method applyProperties
 * Applies customizing properties to the dialog box.
 * @param {Object}    properties Different properties to customize the dialog box
 * @param {String}   [properties.boxtone1 = "#aaa"] BackgroundColor for the first half of dialog box
 * @param {String}   [properties.boxtone2 = "#fff"] BackgroundColor for the second half of dialog box
 * @param {String}   [properties.imagesrc = ""] ImageSource for the image
 * @param {String}   [properties.labelcolor = "#000"] Color for the label
 * @param {String}   [properties.labeltext = "Click OK to continue."] Text for the label
 * @param {String}   [properties.button1bgcolor = "#aaa"] BackgroundColor for the first button
 * @param {String}   [properties.button1color = "#fff"] Color for the second button
 * @param {String}   [properties.button1text = "OK"] Text for the first button
 * @param {Function} [properties.button1event = "function() { close(); }"] EventFunction for the first button
 * @param {String}   [properties.button2bgcolor = "#444"] BackgroundColor for the second button
 * @param {String}   [properties.button2color = "#fff"] Color for the second button
 * @param {String}   [properties.button2text = "CANCEL"] Text for the second button
 * @param {Function} [properties.button2event = "function() { close(); }"] EventFunction for the second button
 */
function applyProperties(properties) {
	var button1Hidden = false;
	var button2Hidden = false;

	//Dialog Box properties
	$.dialogBoxTone1.backgroundColor = properties.boxtone1 || '#aaa';
	$.dialogBoxTone2.backgroundColor = properties.boxtone2 || '#fff';
	//Image properties
	$.dialogBoxImage.backgroundImage = properties.imagesrc || '';
	//Label properties
	$.dialogBoxLabel.color = properties.labelcolor || '#000';
	$.dialogBoxLabel.text = properties.labeltext || 'Click OK to continue.';
	//Button 1 properties
	if (properties.button1text === '') {
		$.dialogBoxButton1.width = 0;
		button1Hidden = true;
	} else {
		$.dialogBoxButton1.backgroundColor = properties.button1bgcolor || '#aaa';
		$.dialogBoxButton1.color = properties.button1color || '#fff';
		$.dialogBoxButton1.text = properties.button1text || 'OK';
		$.dialogBoxButton1.addEventListener('click',function() {
			$.dialogBoxButton1.opacity = 0.75;
			var clickFeedback = setTimeout(function() {
				$.dialogBoxButton1.opacity = 1;
				clearInterval(clickFeedback);
				if (properties.button1event) properties.button1event();
				close();
			}, 100);
		});
	}
	//Button 2 properties
	if (properties.button2text === '') {
		$.dialogBoxButton2.width = 0;
		button2Hidden = true;
	} else {
		$.dialogBoxButton2.backgroundColor = properties.button2bgcolor || '#444';
		$.dialogBoxButton2.color = properties.button2color || '#fff';
		$.dialogBoxButton2.text = properties.button2text || 'CANCEL';
		$.dialogBoxButton2.addEventListener('click',function() {
			$.dialogBoxButton2.opacity = 0.75;
			var clickFeedback = setTimeout(function() {
				$.dialogBoxButton2.opacity = 1;
				clearInterval(clickFeedback);
				if (properties.button2event) properties.button2event();
				close();
			}, 100);
		});
	}
	//Resizing Buttons
	if (button1Hidden) {
		$.dialogBoxButton2.width = "100%";
	} else if (button2Hidden) {
		$.dialogBoxButton1.width = "100%";
	} else if (button1Hidden == false && button2Hidden == false) {
		$.dialogBoxButton1.width = "30%";
		$.dialogBoxButton2.width = "61.7%";
	}
};

/**
 * @method open
 * Opens the dialog box
 */
function open() {
	CONFIG.parentView.add($.Wrapper);
};

/**
 * @method close
 * Closes the dialog box
 */
function close() {
	CONFIG.parentView.remove($.Wrapper);
};