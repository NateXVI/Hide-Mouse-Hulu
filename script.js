// controls container variable declaration
let controlsContainer = null;

// delay between searches for controls container (in milliseconds)
const findDelay = 500;

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

function initializeControlsObserver() {
	// creates an observer and sets it to look for changes in the controls container

	function callback(mutations) {
		// get the opacity of the controls container
		let opacity = parseFloat(controlsContainer.style.opacity);

		// make the mouse visible if the opacity is greater than 0.5
		setMouse(opacity >= 0.5);
	}

	// create an observer
	const observer = new MutationObserver(callback);

	// set the observer to look for changes in the controls container
	observer.observe(controlsContainer, {
		attributes: true, //configure it to listen to attribute changes
	});
}

// start finding the controls container
findControlsContainer();
