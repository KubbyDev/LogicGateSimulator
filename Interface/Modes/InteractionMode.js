let interactionModeButtons = []; //Les boutons du menu contextuel (menu de droite)

class InteractionMode {

    static get buttons() {
        return interactionModeButtons;
    }

    /***
     * Appellee quand l'utilisateur fait un clic avec ce mode selectionne
     */
    static onClick() {

        let selectedGate = getGateAtPosition(mouseX, mouseY);
        if(selectedGate && typeof selectedGate.onClick === 'function') //Si la fonction onClick existe
            selectedGate.onClick();
    }

    /***
     * Appellee a chaque frame quand ce mode est selectionne
     */
    static update() {
    }

    /***
     * Appellee quand l'utilisateur passe sur ce mode
     */
    static enable() {
        interfaceMode = 2;
    }

    /***
     * Met a jour puis dessine le menu de droite
     */
    static updateContextualMenu() {
    }

    static init() {
        interactionModeButtons = [];
    }

    /***
     * Apelle par UserInteraction a chaque key press dans ce mode
     * @param key
     */
    static onKeyPressed(key) {
    }
}