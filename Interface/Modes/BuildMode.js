class BuildMode {

    static selectedGate = null;
    static selectorPosition = 0; //Index du premier bouton affiche dans la liste de droite
    static listLength = 0; //Nombre de boutons affiches dans la liste de droite
    static buttons; //Les boutons du menu contextuel (menu de droite)
    static lastCustomGate = ""; //La derniere CustomGate ajoutee

    /***
     * Appellee quand l'utilisateur fait un clic avec ce mode selectionne
     */
    static onClick() {

        if(BuildMode.selectedGate !== null)
            BuildMode.selectedGate = null;
        else
            BuildMode.selectedGate = getGateAtPosition(mouseX, mouseY);
    }

    /***
     * Appellee a chaque frame quand ce mode est selectionne
     */
    static update() {

        if(BuildMode.selectedGate) {
            BuildMode.selectedGate.x = mouseX;
            BuildMode.selectedGate.y = mouseY;
        }
    }

    /***
     * Appellee quand l'utilisateur passe sur ce mode
     */
    static enable() {
        Interface.mode = 0;
        BuildMode.selectedGate = null;
    }

    /***
     * Met a jour puis dessine le menu de droite
     */
    static updateContextualMenu() {

        //GL si t'essayes de comprendre ce foutoir

        //On met tous les boutons a l'exterieur de base pour eviter tout probleme
        for(let button of BuildMode.buttons) {
            button.x = -100;
            button.y = -100;
        }

        //Bouton destroy
        BuildMode.buttons[0].x = canvas.width - BuildMode.buttons[0].width/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[0].y = canvas.height - BuildMode.buttons[0].height/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[0].draw();

        //Calcul du nombre de boutons affichables a droite
        BuildMode.listLength = Math.floor(
            (canvas.height
            - BuildMode.buttons[0].height
            - 2*BuildMode.buttons[1].height
            - 5*Interface.BUTTON_SPACING)
            / (BuildMode.buttons[5].height+Interface.BUTTON_SPACING));

        //Boutons de controle de la liste de creation de gates
        BuildMode.buttons[1].x = canvas.width - BuildMode.buttons[1].width/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[1].y = BuildMode.buttons[1].height/2 + Interface.BUTTON_SPACING;
        BuildMode.buttons[2].x = canvas.width - BuildMode.buttons[2].width/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[2].y = BuildMode.buttons[5].height*BuildMode.listLength + 1.5*BuildMode.buttons[1].height + Interface.BUTTON_SPACING*(2+BuildMode.listLength);
        BuildMode.buttons[1].draw();
        BuildMode.buttons[2].draw();

        //Boutons de creation de gates
        for(let i = 0; i < BuildMode.listLength; i++) {

            if(BuildMode.selectorPosition+i+5 > BuildMode.buttons.length) //Si il n'y a pas assez de boutons on sort
                break;

            BuildMode.buttons[BuildMode.selectorPosition+i+5].x = canvas.width - BuildMode.buttons[5].width/2 - Interface.BUTTON_SPACING;
            BuildMode.buttons[BuildMode.selectorPosition+i+5].y = BuildMode.buttons[1].height + (i+0.5)*(BuildMode.buttons[5].height) + (i+2)*Interface.BUTTON_SPACING;
            BuildMode.buttons[BuildMode.selectorPosition+i+5].draw();
        }

        //Boutons des Custom Gates
        BuildMode.buttons[3].x = BuildMode.buttons[3].width/2 + Interface.BUTTON_SPACING;
        BuildMode.buttons[3].y = canvas.height - BuildMode.buttons[3].height/2 - Interface.BUTTON_SPACING;
        if(BuildMode.lastCustomGate !== "") {

            BuildMode.buttons[4].x = BuildMode.buttons[3].width + BuildMode.buttons[4].width/2 + 2*Interface.BUTTON_SPACING;
            BuildMode.buttons[4].y = canvas.height - BuildMode.buttons[4].height/2 - Interface.BUTTON_SPACING;
            BuildMode.buttons[4].draw();
        } else {

            BuildMode.buttons[4].x = -100;
            BuildMode.buttons[4].y = -100;
        }
        BuildMode.buttons[3].draw();
    }

    static init() {

        BuildMode.buttons = [
            new Button()
                .setGraphicProperties(80, 50, "Destroy", "#ae110b")
                .setOnClick(() => BuildMode.removeGate(BuildMode.selectedGate)),
            new Button()
                .setGraphicProperties(80, 30, "UP", "#379f1f")
                .setOnClick(() => BuildMode.selectorPosition = Math.max(0, BuildMode.selectorPosition-1)),
            new Button()
                .setGraphicProperties(80, 30, "DOWN", "#379f1f")
                .setOnClick(() => BuildMode.selectorPosition = Math.min(BuildMode.buttons.length-BuildMode.listLength-5, BuildMode.selectorPosition+1)),
            new Button()
                .setGraphicProperties(150, 60, "Create Custom Gate", "#379f1f")
                .setOnClick(() => CustomGate.openPopup()),
            new Button()
                .setGraphicProperties(150, 60, "Last Custom Gate", "#379f1f")
                .setOnClick(() => BuildMode.addGate(CustomGate.parse(BuildMode.lastCustomGate))),
            new Button()
                .setGraphicProperties(80, 80, "AND", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.AND(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "OR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.OR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NOT", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.NOT(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "XOR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.XOR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NOR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.NOR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NAND", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.NAND(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "XNOR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.XNOR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "UP", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.UP(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "DOWN", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.DOWN(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "CLOCK", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.CLOCK(mouseX, mouseY, 50))),
            new Button()
                .setGraphicProperties(80, 80, "INPUT", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.INPUT(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "OUTPUT", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.OUTPUT(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "SWITCH", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.SWITCH(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NODE", "#379f1f")
                .setOnClick(() => BuildMode.addGate(Basic.NODE(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80,80, "CUSTOM", "#379f1f")
                .setOnClick(() => BuildMode.openCustomGatePopup())
        ]
    }

    /***
     * Ouvre le popup qui demande de donner un string pour la CustomGate
     */
    static openCustomGatePopup() {

        Interface.openPopup();

        let mainDiv = document.getElementById("popup_main_div");
        let div = document.createElement("DIV");

        let separator = document.createElement("HR");
        separator.innerHTML = "Data for your gate (you can generate it with the Build Custom Gate button)";
        div.appendChild(separator);

        let input = document.createElement("INPUT");
        input.id = "rawData";
        input.minlength="0";
        input.maxlength="6";
        div.appendChild(input);

        let button = document.createElement("BUTTON");
        button.addEventListener('click', () => {
            let gate = CustomGate.parse(document.getElementById("rawData").value);
            BuildMode.addGate(gate);
            BuildMode.lastCustomGate = gate.string;
            Interface.closePopup();
        });
        button.innerHTML = "Done";
        div.appendChild(button);
        mainDiv.appendChild(div);
    }

    /***
     * Ajoute une porte a l'affichage principal
     * @param gate
     */
    static addGate(gate) {
        BuildMode.selectedGate = gate;
        gates.push(gate);
    }

    /***
     * Supprime une porte de l'affichage principal
     * @param gate
     */
    static removeGate(gate) {

        gates = gates.remove(gate);
        BuildMode.selectedGate = null;

        if(gate instanceof CustomGate)
            for(let outputGate of gate.outputGates)
                Gate.removeAllConnectionsTo(outputGate, gates);
        else
            Gate.removeAllConnectionsTo(gate, gates);
    }

    /***
     * Appelle par UserInteraction a chaque key press dans ce mode
     * @param key
     */
    static onKeyPressed(key) {

        if(key === 'Delete')
            BuildMode.removeGate(BuildMode.selectedGate);
    }
}