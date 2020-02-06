let buildModeSelectedGate = null;
let buildModeSelectorPosition = 0; // Index of the first button displayed in the list on the right
let buildModeListLength = 0; // Number of buttons in the list on the right
let buildModeButtons = []; // Buttons that should be displayed only in this mode
let buildModeLastCustomGate = ""; // Last custom gate loaded

class BuildMode {

    static get buttons() {
        return buildModeButtons;
    }

    /*** Called when the user clicks somewhere with this mode selected */
    static onClick() {

        if(buildModeSelectedGate !== null)
            buildModeSelectedGate = null;
        else
            buildModeSelectedGate = getGateAtPosition(mouseX, mouseY);
    }

    /*** Called on every frame when this menu is selected */
    static update() {

        if(buildModeSelectedGate) {
            buildModeSelectedGate.x = mouseX;
            buildModeSelectedGate.y = mouseY;
        }
    }

    /*** Called when the user switches to this mode */
    static enable() {
        interfaceMode = 0;
        buildModeSelectedGate = null;
    }

    /*** Updates and draws the menu on the right */
    static updateContextualMenu() {

        // Displays the list of gates on the right

        // To limit problems we start by putting everything in the exterior of the screen
        for(let button of buildModeButtons) {
            button.x = -100;
            button.y = -100;
        }

        // Destroy button
        buildModeButtons[0].x = canvas.width - buildModeButtons[0].width/2 - interfaceButtonSpacing;
        buildModeButtons[0].y = canvas.height - buildModeButtons[0].height/2 - interfaceButtonSpacing;
        buildModeButtons[0].draw();

        // Calculates the number of buttons that can be displayed
        buildModeListLength = Math.floor(
            (canvas.height
            - buildModeButtons[0].height
            - 2*buildModeButtons[1].height
            - 5*interfaceButtonSpacing)
            / (buildModeButtons[5].height+interfaceButtonSpacing));

        // Buttons to control the list (up and down)
        buildModeButtons[1].x = canvas.width - buildModeButtons[1].width/2 - interfaceButtonSpacing;
        buildModeButtons[1].y = buildModeButtons[1].height/2 + interfaceButtonSpacing;
        buildModeButtons[2].x = canvas.width - buildModeButtons[2].width/2 - interfaceButtonSpacing;
        buildModeButtons[2].y = buildModeButtons[5].height*buildModeListLength + 1.5*buildModeButtons[1].height + interfaceButtonSpacing*(2+buildModeListLength);
        buildModeButtons[1].draw();
        buildModeButtons[2].draw();

        // Gate creation buttons
        for(let i = 0; i < buildModeListLength; i++) {

            if(buildModeSelectorPosition+i+5 > buildModeButtons.length) // If there is no more buttons to display, breaks
                break;

            buildModeButtons[buildModeSelectorPosition+i+5].x = canvas.width - buildModeButtons[5].width/2 - interfaceButtonSpacing;
            buildModeButtons[buildModeSelectorPosition+i+5].y = buildModeButtons[1].height + (i+0.5)*(buildModeButtons[5].height) + (i+2)*interfaceButtonSpacing;
            buildModeButtons[buildModeSelectorPosition+i+5].draw();
        }

        // Custom gate buttons
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

        // Create all the buttons of the list on the right
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
                .setOnClick(() => BuildMode.addGate(GateFactory.AND(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "OR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.OR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NOT", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.NOT(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "XOR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.XOR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NOR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.NOR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NAND", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.NAND(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "XNOR", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.XNOR(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "UP", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.UP(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "DOWN", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.DOWN(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "CLOCK", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.CLOCK(mouseX, mouseY, 50))),
            new Button()
                .setGraphicProperties(80, 80, "INPUT", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.INPUT(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "OUTPUT", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.OUTPUT(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "SWITCH", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.SWITCH(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80, 80, "NODE", "#379f1f")
                .setOnClick(() => BuildMode.addGate(GateFactory.NODE(mouseX, mouseY))),
            new Button()
                .setGraphicProperties(80,80, "CUSTOM", "#379f1f")
                .setOnClick(() => BuildMode.openCustomGatePopup())
        ];

        // Draws arrows on the buttons to control the list of gates
        buildModeButtons[1].drawCenter = function() {
            ctx.beginPath();
            ctx.moveTo(this.x - this.width/8, this.y + this.height/8);
            ctx.lineTo(this.x + this.width/8, this.y + this.height/8);
            ctx.lineTo(this.x, this.y - this.height/8);
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.fillStyle = "#379f1f";
            ctx.fill();

        };
        buildModeButtons[2].drawCenter = function() {
            ctx.beginPath();
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.lineTo(this.x + this.width/8, this.y - this.height/8);
            ctx.lineTo(this.x, this.y + this.height/8);
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.fillStyle = "#379f1f";
            ctx.fill();

        };
    }

    /*** Opens the popup that asks for a string to build a CustomGate */
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

    /*** Adds a gate to the simulation
     * Put select to automatically select the new gate */
    static addGate(gate, select) {
        if(select === undefined || !select)
            buildModeSelectedGate = gate;
        gate.id = Gate.nextID;
        Gate.nextID++;
        gates.push(gate);
    }

    /*** Removes a gate from the simulation */
    static removeGate(gate) {

        gates = gates.remove(gate);
        buildModeSelectedGate = null;

        if(gate instanceof CustomGate)
            for(let outputGate of gate.outputGates)
                Gate.removeAllConnectionsTo(outputGate, gates);
        else
            Gate.removeAllConnectionsTo(gate, gates);
    }

    /*** Called for each key press with this mode selected */
    static onKeyPressed(key) {
        if(key === 'Delete')
            BuildMode.removeGate(buildModeSelectedGate);
    }
}