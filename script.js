let mouseTimer = null;

function setMouse(state) {
    try {
        document.querySelector('.class36, .class4').style.cursor = state ? 'auto' : 'none';
    } catch (error) {}
}

function resetTimer() {
    setMouse(1);
    if (mouseTimer) window.clearTimeout(mouseTimer);
    mouseTimer = setTimeout(setMouse, 5000, 0);
}

window.addEventListener('mousemove', resetTimer)