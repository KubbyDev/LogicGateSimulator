
// Tracks the mouse position
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
});

// Listens for mouse clicks
document.addEventListener('click', function() {

    if(Interface.blockInputs)
        return;

    // If the user clicked on a button, triggers the onClick function of the button
    const clickedButton = Interface.getButtonAtPosition(mouseX, mouseY);
    if(clickedButton) {
        clickedButton.onClick();
        return;
    }

    // If there is no button where the user clicked, calls the onClick of the current mode
    Interface.getCurrentMode().onClick();
});

// Mobile compatilibity: When the user touches the screen it triggers a click, then moving the finger will move
// the mouse position, and releasing will trigger another click event. It's not ideal but it works without changing
// anything in the rest of the program
document.addEventListener('touchstart', function(event) {
    mouseX = event.changedTouches[0].pageX;
    mouseY = event.changedTouches[0].pageY;
    document.dispatchEvent(new Event('click'));
});
document.addEventListener('touchend', function(event) {
    mouseX = event.changedTouches[0].pageX;
    mouseY = event.changedTouches[0].pageY;
    document.dispatchEvent(new Event('click'));
});
document.addEventListener('touchmove', function(event) {
    mouseX = event.changedTouches[0].pageX;
    mouseY = event.changedTouches[0].pageY;
});

// Tracks key presses
let shiftPressed = false;
let rightArrowPressed = false;
document.onkeyup = function(event) {

    if(event.key === 'Shift')
        shiftPressed = false;
    if(event.key === 'ArrowRight')
        rightArrowPressed = false;
};

// Listens for keyboard inputs
document.onkeydown = function(event) {

    switch(event.key) {
        case 'Escape':
            Popup.close();
            break;
        case 'Shift':
            shiftPressed = true;
            break;
        case 'ArrowRight':
            rightArrowPressed = true;
            break;
    }

    if(Interface.blockInputs)
        return;

    switch(event.key) {
        case 'b':
            BuildMode.enable();
            break;
        case 'w':
            WiringMode.enable();
            break;
        case 'i':
            InteractionMode.enable();
            break;
    }

    Interface.getCurrentMode().onKeyPressed(event.key);
};

// Listens for mouse wheel inputs
canvas.addEventListener('wheel', function(event) {

    if(Interface.blockInputs)
        return;

    Interface.zoom(1 - event.deltaY/1000);
});