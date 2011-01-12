(function(oCanvas, window, document, undefined){

	// Define the class
	var keyboard = function () {
		
		// Return an object when instantiated
		return {
			// Method used by oCanvas to give this object access to the current instance of the core object
			setCore: function (thecore) {
				this.core = thecore;
			},
			
			// List of all events that are added
			eventList: {
				keydown: [],
				keyup: [],
				keypress: [],
				running: []
			},
			
			// Define properties
			keysDown: {},
			keyPressTimer: 0,
			keyPressRunning: false,
			modifiedKeys: {},
			lastActiveKeyDown: false,
			
			// Method for initializing the keyboard object
			init: function () {
				this.running = false;
				
				// Add event listeners to the document
				document.addEventListener("keydown", this.keydown, false);
				document.addEventListener("keyup", this.keyup, false);
				document.addEventListener("keypress", this.preventkeypress, false);
			},
			
			// Method for adding an event to the event list
			addEvent: function (type, func) {
				return this.eventList[type].push(func) - 1;
			},
			
			// Method for removing an event from the event list
			removeEvent: function (type, id) {
				this.eventList[type].splice(id,1);
			},
			
			// Method for getting the key code from current event
			getKeyCode: function (e) {
				return e.keyCode === 0 ? e.which : e.keyCode;
			},
			
			// Method for checking if any keys are pressed down
			anyKeysDown: function () {
				var active = 0,
					keysDown = this.keysDown;
				
				// Go through all the keys that are currently pressed down
				for (var x in keysDown) {
					if (keysDown[x] === true) {
						active++;
					}
				}
				
				if (active > 0) {
					return true;
				} else {
					return false;
				}
			},
			
			// Method for triggering all events of a specific type
			triggerEvents: function (type, e) {
				var key, i, event;
				
				// If the mouse has set focus on the canvas
				if (this.core.mouse && this.core.mouse.canvasFocused === true) {
					key = this.eventList[type];
					
					// Loop through all events and trigger them
					for (i = key.length; i--;) {
						event = key[i];
						if (typeof event === "function") {
							event(e);
						}
					}
				}
			},
			
			// Method for triggering the events when a key is pressed down
			keydown: function (e) {
				var _this = this;
				this.triggerEvents("keydown", e);
	
				// Set the key states
				this.lastActiveKeyDown = this.getKeyCode(e);
				this.keysDown[this.lastActiveKeyDown] = true;
				
				// If there are keypress events attached and none are currently running
				if (!this.keyPressRunning && this.eventList.keypress.length > 0) {
				
					// Set the timer to trigger keypress events continuosly until released
					this.keyPressTimer = setInterval(function () { _this.keypress(e); }, 1000 / this.core.settings.fps);
					this.keyPressRunning = true;
				}
				
				// Prevent the default behavior of the assigned keys
				this.preventkeypress(e);
			},
			
			// Method for triggering the events when a key is released
			keyup: function (e) {
				this.triggerEvents("keyup", e);
				
				// Set the key states
				var keyCode = this.getKeyCode(e);
				if (keyCode === this.lastActiveKeyDown) {
					this.lastActiveKeyDown = false;
				}
				this.keysDown[keyCode] = false;
				
				// If there are no more keys pressed down, cancel the keypress timer
				if (!this.anyKeysDown()) {
					clearInterval(this.keyPressTimer);
					this.keyPressRunning = false;
				}
			},
			
			// Method for triggering the events when a key is pressed
			// The keydown method will trigger this method continuously until released
			keypress: function (e) {
				this.triggerEvents("keypress", e);
			},
			
			// Method for preventing the default behavior of the assigned keys
			preventkeypress: function (e) {
				var keyCode, modifiedKeys, code;
				
				if (this.core.mouse.canvasFocused === true) {
					keyCode = this.getKeyCode(e);
					modifiedKeys = this.modifiedKeys;
					
					for (code in modifiedKeys) {
						if (keyCode === code && modifiedKeys[code] !== false) {
							e.preventDefault();
						}
					}
				}
			},
			
			ARROW_UP:38, ARROW_DOWN:40, ARROW_LEFT:37, ARROW_RIGHT:39, SPACE:32, ENTER:13, ESC:27
		};
	};
	
	// Register the module
	oCanvas.registerModule("keyboard", keyboard);

})(oCanvas, window, document);