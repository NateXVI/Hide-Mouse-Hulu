// variable to store the timer that hides the mouse
let mouseTimer = null;

function setMouse(state) {
	// hides or shows the mouse depending on state given
	try {
		document.querySelector('#web-player-app').style.cursor = state ? 'auto' : 'none';
	} catch (error) {}
}

function resetTimer() {
	// resets the mouse timer and makes mouse visible
	setMouse(1);
	if (mouseTimer) window.clearTimeout(mouseTimer);
	mouseTimer = setTimeout(setMouse, 3100, 0);
}

// resets timer if the mouse is moved
window.addEventListener('mousemove', resetTimer);

// resets timer if the mouse is clicked
window.addEventListener('mousedown', resetTimer);

// keys that will reset the timer when pressed
let listenKeys = [
	'ArrowUp',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	' ',
	'Tab',
	'k',
	'm',
];

// make all the key strings lowercase so uppercase keys reset timer as well
listenKeys = listenKeys.map((key) => key.toLowerCase());

window.addEventListener('keydown', (e) => {
	// when a key is pressed...
	if (listenKeys.includes(e.key.toLowerCase())) {
		// if the key pressed is one of the listen keys, reset the timer
		resetTimer();
	}
});
