let mouseTimer = null;

function setMouse(state) {
    try {
        document.querySelector('#web-player-app').style.cursor = state ? 'auto' : 'none';
    } catch (error) {}
}

function resetTimer() {
    setMouse(1);
    if (mouseTimer) window.clearTimeout(mouseTimer);
    mouseTimer = setTimeout(setMouse, 3200, 0);
}

window.addEventListener('mousemove', resetTimer)