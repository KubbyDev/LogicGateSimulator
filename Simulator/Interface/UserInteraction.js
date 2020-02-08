
// Tracks the mouse position
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
});

// Listens for mouse clicks
document.addEventListener('click', function() {

    if(interfaceBlockInputs)
        return;

    // If the user clicked on a button, triggers the onClick function of the button
    let clickedButton = Interface.getButtonAtPosition(mouseX, mouseY);
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

    if(interfaceBlockInputs)
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

    if(interfaceBlockInputs)
        return;

    Interface.zoom(1 - event.deltaY/1000);
});

function getGateAtPosition(x, y) {

    for (let gate of gates)
        if (Math.abs(x - gate.x) < gate.width / 2 && Math.abs(y - gate.y) < gate.height / 2)
            return gate;

    return null;
}