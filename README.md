# Hide Mouse For Hulu 🐭

## Description

This extension adds one of the most **basic** features to Hulu: hiding the mouse cursor when watching a video. 😑

C'mon Hulu, I think you're a good streaming service, but it's disapointing that you haven't added this feature yet. 😔

## How the extension works:

For anyone who is curious or wants to learn how this extension works, here's an explanation. If you have any questions or suggestions, please feel free to open an issue or email me. 😉

---

1. **It has a function that hides the mouse cursor**

Here is the the code for the function:

```javascript
function setMouse(visibility) {
	// sets the mouse visibility for the Hulu web player
	try {
		// set the web player element cursor style
		document.querySelector('#web-player-app').style.cursor = visibility
			? 'auto'
			: 'none';
	} catch (error) {
		// if the mouse visibility cannot be set, log a warning in the console
		console.warn('could not set mouse visibility', error);
	}
}
```

If visibility is true, the mouse will be visible. If it is false, the mouse will be hidden. Pretty simple, right?

What's nice about this code is that it only controls the visibility of the mouse cursor while it is hovering over the web player. You don't have to worry about the mouse cursor being hidden while the web player is not active.

---

2. **Finds a controls container**

A controls container is a container with web player UI controls. I'll explain why we need this later.

We declare "controlsContainer" as a global variable and set its default value to null.

```javascript
let controlsContainer = null;
```

It takes a few seconds after Hulus initial load for the web player to load. Because of this the extension tries to find a controls container every half a second, until one is found.

```javascript
function findControlsContainer() {
	// look for a controls container
	controlsContainer = document.querySelector('.ControlsContainer__transition');

	// if the controls container cannot be found
	if (controlsContainer === null) {
		// set timeout to look again in 500ms
		window.setTimeout(findControlsContainer, findDelay);
	}
	// if the controls container can be found
	else {
		// initialize the observer
		initializeControlsObserver();
	}
}
```

---

3. **Start observing changes to the controls container**

After a controls container is found we want to keep track of when it changes. I'll explain why in the next step.

This code will create an observer object.

```javascript
function callback(mutations) {
	// code that runs when changes are detected
	// ...
}

// set the observer to
observer = new MutationObserver(callback);
```

And this code will tell the observer to look for changes in the controls container attributes.

```javascript
observer.observe(controlsContainer, {
	attributes: true,
});
```

---

4. **Mirror the visibility of the mouse cursor with the opacity of the controls container**

You're still probably wondering why this controls container is so important.

This is an example what a controls container HTML tag looks like:

```html
<div
	class="ControlsContainer__transition"
	style="position: static; visibility: visible; opacity: 1;"
>
	...
</div>
```

What's inside the div does not matter.

You can see that the controls container style attribute has the opacity in it. Whenever this attribute changes we are going to use it to decide if we want to hide or show the mouse cursor. The callback function will be called every time this attribute changes.

Here's a breakdown of what the code <u>inside</u> the callback function does:

First we want to find the opacity of the controls container. This is simply done with this one line.

```javascript
// inside the callback function

// get the opacity of the controls container
let opacity = parseFloat(controlsContainer.style.opacity);
```

Then we want to set the mouse cursor visibility based off of the opacity.

```javascript
// inside the callback function

// make the mouse visible if the opacity is greater than 0.5
setMouse(opacity >= 0.5);
```

And that's it! We now have an extension that hides the mouse cursor when you are watching a video.

---
