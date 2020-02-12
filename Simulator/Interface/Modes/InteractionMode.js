let interactionModeButtons = []; // Buttons that should be displayed only in this mode

class InteractionMode {

    static get buttons() {
        return interactionModeButtons;
    }

    // Events ----------------------------------------------------------------------------------------------------------

    static init() {
        interactionModeButtons = [];
    }

    /*** Called when the user switches to this mode */
    static enable() {
        interfaceMode = 2;
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface update (begining of the frame calculation)*/
    static earlyUpdate() {
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface draw (end of the frame calculation)*/
    static lateUpdate() {
    }

    /*** Called when the user clicks somewhere with this mode selected */
    static onClick() {
        let selectedGate = getGateAtPosition(mouseX, mouseY);
        if(selectedGate)
            selectedGate.onClick();
    }

    /*** Called for each key press with this mode selected */
    static onKeyPressed(key) {
    }
}