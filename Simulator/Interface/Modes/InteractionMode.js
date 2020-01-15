let interactionModeButtons = []; // Buttons that should be displayed only in this mode

class InteractionMode {

    static get buttons() {
        return interactionModeButtons;
    }

    /*** Called when the user clicks somewhere with this mode selected */
    static onClick() {

        let selectedGate = getGateAtPosition(mouseX, mouseY);
        if(selectedGate)
            selectedGate.onClick();
    }

    /*** Called on every frame when this menu is selected */
    static update() {
    }

    /*** Called when the user switches to this mode */
    static enable() {
        interfaceMode = 2;
    }

    /*** Updates and draws the menu on the right */
    static updateContextualMenu() {
    }

    static init() {
        interactionModeButtons = [];
    }

    /*** Called for each key press with this mode selected */
    static onKeyPressed(key) {
    }
}