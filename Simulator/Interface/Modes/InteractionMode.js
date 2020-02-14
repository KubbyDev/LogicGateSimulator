class InteractionMode {

    static buttons; // Buttons that should be displayed only in this mode

    // Events ----------------------------------------------------------------------------------------------------------

    static init() {
        InteractionMode.buttons = [];
    }

    /*** Called when the user switches to this mode */
    static enable() {
        Interface.mode = 2;
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
        const selectedGate = Tools.getGateAtPosition(mouseX, mouseY);
        if(selectedGate)
            selectedGate.onClick();
    }

    /*** Called for each key press with this mode selected */
    static onKeyPressed(key) {
    }
}