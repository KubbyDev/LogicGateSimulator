
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

// Listens for keyboard inputs
document.onkeydown = function(event) {

    switch(event.key) {
        case 'Escape':
            Popup.close();
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