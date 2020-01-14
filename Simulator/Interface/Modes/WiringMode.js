let wiringModeSelectedInput; //La porte qui sert d'input a la connexion (celle qui a la connexion sur son output)
let wiringModeSelectedOutput; //La porte qui sert d'output a la connexion (celle qui a la connexion sur son input)
let wiringModeInputIndex; //L'index de l'input selectionne parmis les inputs de la porte qui sert d'output (selectedOutput)
let wiringModeButtons; //Les boutons du menu contextuel (menu de droite)

class WiringMode {

    static get buttons() {
        return wiringModeButtons;
    }

    /***
     * Appellee quand l'utilisateur fait un clic avec ce mode selectionne
     */
    static onClick() {

        let gate = getGateAtPosition(mouseX, mouseY);

        //Si on clique dans le vide, on annule tout
        if(!gate) {
            wiringModeSelectedInput = null;
            wiringModeSelectedOutput = null;
            return;
        }

        if(!wiringModeSelectedInput) { //Si aucun input n'est selectionnee pour l'instant
            let connectorIndex = gate.getConnector(mouseX, mouseY);
            if(connectorIndex < 0) //Si on a clique sur un output (qui peut donc etre input de notre connexion)
                wiringModeSelectedInput = gate.getGateForOutput(-connectorIndex-1); //On s'y connecte
        }

        if(!wiringModeSelectedOutput) { //Si aucun output n'est selectionnee pour l'instant
            let connectorIndex = gate.getConnector(mouseX, mouseY);
            if(connectorIndex > 0) { //Si on a clique sur un input (qui peut donc etre output de notre connexion)
                wiringModeSelectedOutput = gate; //On s'y connecte
                wiringModeInputIndex = connectorIndex-1;
            }
        }

        //Si l'input et l'output sont definis on cree une connexion
        if(wiringModeSelectedOutput && wiringModeSelectedInput) {
            wiringModeSelectedOutput.addInput(wiringModeSelectedInput, wiringModeInputIndex);
            wiringModeSelectedInput = null;
            wiringModeSelectedOutput = null;
        }
    }

    /***
     * Appellee a chaque frame quand ce mode est selectionne
     */
    static update() {

        //Si un input ou un output est selectionne
        if(wiringModeSelectedInput || wiringModeSelectedOutput) {

            //Un des points sera la souris, l'autre sera soit l'input selectionne, soit l'output selectionne
            let otherPoint = wiringModeSelectedOutput
                ? wiringModeSelectedOutput.getInputPosition(wiringModeInputIndex)
                : [wiringModeSelectedInput.x  + wiringModeSelectedInput.width/2 - connectionWidth, wiringModeSelectedInput.y];

            //Dessin d'une ligne d'un point a l'autre
            ctx.beginPath();
            ctx.strokeStyle = "#d3d3d3";
            ctx.lineWidth = connectionWidth;
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
        interfaceMode = 1;
        wiringModeSelectedInput = null;
        wiringModeSelectedOutput = null;
    }

    /***
     * Met a jour puis dessine le menu de droite
     */
    static updateContextualMenu() {
    }

    static init() {
        wiringModeButtons = [];
    }

    /***
     * Appelle par UserInteraction a chaque key press dans ce mode
     * @param key
     */
    static onKeyPressed(key) {
    }
}