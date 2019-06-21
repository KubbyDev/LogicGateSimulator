let buildModeSelectedGate = null;
let buildModeSelectorPosition = 0; //Index du premier bouton affiche dans la liste de droite
let buildModeListLength = 0; //Nombre de boutons affiches dans la liste de droite
let buildModeButtons = []; //Les boutons du menu contextuel (menu de droite)
let buildModeLastCustomGate = ""; //La derniere CustomGate ajoutee

class BuildMode {

    static get buttons() {
        return buildModeButtons;
    }

    /***
     * Appellee quand l'utilisateur fait un clic avec ce mode selectionne
     */
    static onClick() {

        if(buildModeSelectedGate !== null)
            buildModeSelectedGate = null;
        else
            buildModeSelectedGate = getGateAtPosition(mouseX, mouseY);
    }

    /***
     * Appellee a chaque frame quand ce mode est selectionne
     */
    static update() {

        if(buildModeSelectedGate) {
            buildModeSelectedGate.x = mouseX;
            buildModeSelectedGate.y = mouseY;
        }
    }

    /***
     * Appellee quand l'utilisateur passe sur ce mode
     */
    static enable() {
        interfaceMode = 0;
        buildModeSelectedGate = null;
    }

    /***
     * Met a jour puis dessine le menu de droite
     */
    static updateContextualMenu() {

        //GL si t'essayes de comprendre ce foutoir

        //On met tous les boutons a l'exterieur de base pour eviter tout probleme
        for(let button of buildModeButtons) {
            button.x = -100;
            button.y = -100;
        }

        //Bouton destroy
        buildModeButtons[0].x = canvas.width - buildModeButtons[0].width/2 - interfaceButtonSpacing;
        buildModeButtons[0].y = canvas.height - buildModeButtons[0].height/2 - interfaceButtonSpacing;
        buildModeButtons[0].draw();

        //Calcul du nombre de boutons affichables a droite
        buildModeListLength = Math.floor(
            (canvas.height
            - buildModeButtons[0].height
            - 2*buildModeButtons[1].height
            - 5*interfaceButtonSpacing)
            / (buildModeButtons[5].height+interfaceButtonSpacing));

        //Boutons de controle de la liste de creation de gates
        buildModeButtons[1].x = canvas.width - buildModeButtons[1].width/2 - interfaceButtonSpacing;
        buildModeButtons[1].y = buildModeButtons[1].height/2 + interfaceButtonSpacing;
        buildModeButtons[2].x = canvas.width - buildModeButtons[2].width/2 - interfaceButtonSpacing;
        buildModeButtons[2].y = buildModeButtons[5].height*buildModeListLength + 1.5*buildModeButtons[1].height + interfaceButtonSpacing*(2+buildModeListLength);
        buildModeButtons[1].draw();
        buildModeButtons[2].draw();

        //Boutons de creation de gates
        for(let i = 0; i < buildModeListLength; i++) {

            if(buildModeSelectorPosition+i+5 > buildModeButtons.length) //Si il n'y a pas assez de boutons on sort
                break;

            buildModeButtons[buildModeSelectorPosition+i+5].x = canvas.width - buildModeButtons[5].width/2 - interfaceButtonSpacing;
            buildModeButtons[buildModeSelectorPosition+i+5].y = buildModeButtons[1].height + (i+0.5)*(buildModeButtons[5].height) + (i+2)*interfaceButtonSpacing;
            buildModeButtons[buildModeSelectorPosition+i+5].draw();
        }

        //Boutons des Custom Gates
        buildModeButtons[3].x = buildModeButtons[3].width/2 + interfaceButtonSpacing;
        buildModeButtons[3].y = canvas.height - buildModeButtons[3].height/2 - interfaceButtonSpacing;
        if(buildModeLastCustomGate !== "") {

            buildModeButtons[4].x = buildModeButtons[3].width + buildModeButtons[4].width/2 + 2*interfaceButtonSpacing;
            buildModeButtons[4].y = canvas.height - buildModeButtons[4].height/2 - interfaceButtonSpacing;
            buildModeButtons[4].draw();
        } else {

            buildModeButtons[4].x = -100;
            buildModeButtons[4].y = -100;
        }
        buildModeButtons[3].draw();
    }

    static init() {

        buildModeButtons = [
            new Button()
                .setGraphicProperties(80, 50, "Destroy", "#ae110b")
                .setOnClick(() => BuildMode.removeGate(buildModeSelectedGate)),
            new Button()
                .setGraphicProperties(80, 30, "UP", "#379f1f")
                .setOnClick(() => buildModeSelectorPosition = Math.max(0, buildModeSelectorPosition-1)),
            new Button()
                .setGraphicProperties(80, 30, "DOWN", "#379f1f")
                .setOnClick(() => buildModeSelectorPosition = Math.min(buildModeButtons.length-buildModeListLength-5, buildModeSelectorPosition+1)),
            new Button()
                .setGraphicProperties(150, 60, "Create Custom Gate", "#379f1f")
                .setOnClick(() => CustomGate.openPopup()),
            new Button()
                .setGraphicProperties(150, 60, "Last Custom Gate", "#379f1f")
                .setOnClick(() => BuildMode.addGate(SerializerParser.parseCustomGate(buildModeLastCustomGate))),
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
        ];

        buildModeButtons[1].drawCenter = function() {

            ctx.beginPath();
            ctx.moveTo(this.x - this.width/8, this.y + this.height/8);
            ctx.lineTo(this.x + this.width/8, this.y + this.height/8);
            ctx.lineTo(this.x, this.y - this.height/8);
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.fillStyle = "#379f1f";
            ctx.fill();
            ctx.closePath();
        };

        buildModeButtons[2].drawCenter = function() {

            ctx.beginPath();
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.lineTo(this.x + this.width/8, this.y - this.height/8);
            ctx.lineTo(this.x, this.y + this.height/8);
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.fillStyle = "#379f1f";
            ctx.fill();
            ctx.closePath();
        };
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
        input.size = 100;
        div.appendChild(input);

        let button = document.createElement("BUTTON");
        button.addEventListener('click', () => {
            let gate = SerializerParser.parseCustomGate(document.getElementById("rawData").value);
            BuildMode.addGate(gate);
            buildModeLastCustomGate = gate.string;
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
        buildModeSelectedGate = gate;
        gates.push(gate);
    }

    /***
     * Supprime une porte de l'affichage principal
     * @param gate
     */
    static removeGate(gate) {

        gates = gates.remove(gate);
        buildModeSelectedGate = null;

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
            BuildMode.removeGate(buildModeSelectedGate);
    }
}