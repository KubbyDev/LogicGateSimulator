class WiringMode {

    static selectedInput; //La porte qui sert d'input a la connexion (celle qui a la connexion sur son output)
    static selectedOutput; //La porte qui sert d'output a la connexion (celle qui a la connexion sur son input)
    static inputIndex; //L'index de l'input selectionne parmis les inputs de la porte qui sert d'output (selectedOutput)
    static buttons; //Les boutons du menu contextuel (menu de droite)

    /***
     * Appellee quand l'utilisateur fait un clic avec ce mode selectionne
     */
    static onClick() {

        let gate = getGateAtPosition(mouseX, mouseY);

        //Si on clique dans le vide, on annule tout
        if(!gate) {
            WiringMode.selectedInput = null;
            WiringMode.selectedOutput = null;
            return;
        }

        if(!WiringMode.selectedInput) { //Si aucun input n'est selectionnee pour l'instant
            let connectorIndex = gate.getConnector(mouseX, mouseY);
            if(connectorIndex < 0) //Si on a clique sur un output (qui peut donc etre input de notre connexion)
                WiringMode.selectedInput = gate.getGateForOutput(-connectorIndex-1); //On s'y connecte
        }

        if(!WiringMode.selectedOutput) { //Si aucun output n'est selectionnee pour l'instant
            let connectorIndex = gate.getConnector(mouseX, mouseY);
            if(connectorIndex > 0) { //Si on a clique sur un input (qui peut donc etre output de notre connexion)
                WiringMode.selectedOutput = gate; //On s'y connecte
                WiringMode.inputIndex = connectorIndex-1;
            }
        }

        //Si l'input et l'output sont definis on cree une connexion
        if(WiringMode.selectedOutput && WiringMode.selectedInput) {
            WiringMode.selectedOutput.addInput(WiringMode.selectedInput, WiringMode.inputIndex);
            WiringMode.selectedInput = null;
            WiringMode.selectedOutput = null;
        }
    }

    /***
     * Appellee a chaque frame quand ce mode est selectionne
     */
    static update() {

        //Si un input ou un output est selectionne
        if(WiringMode.selectedInput || WiringMode.selectedOutput) {

            //Un des points sera la souris, l'autre sera soit l'input selectionne, soit l'output selectionne
            let otherPoint = WiringMode.selectedOutput
                ? WiringMode.selectedOutput.getInputPosition(WiringMode.inputIndex)
                : [WiringMode.selectedInput.x  + WiringMode.selectedInput.width/2 - Connection.WIDTH, WiringMode.selectedInput.y];

            //Dessin d'une ligne d'un point a l'autre
            ctx.beginPath();
            ctx.strokeStyle = "#d3d3d3";
            ctx.lineWidth = Connection.WIDTH;
            ctx.moveTo(otherPoint[0], otherPoint[1]);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            ctx.closePath();
        }
    }

    /***
     * Appellee quand l'utilisateur passe sur ce mode
     */
    static enable() {
        Interface.mode = 1;
        WiringMode.selectedInput = null;
        WiringMode.selectedOutput = null;
    }

    /***
     * Met a jour puis dessine le menu de droite
     */
    static updateContextualMenu() {
    }

    static init() {
        WiringMode.buttons = [];
    }

    /***
     * Appelle par UserInteraction a chaque key press dans ce mode
     * @param key
     */
    static onKeyPressed(key) {
    }
}