class BuildMode {

    static selectedGate = null;
    static selectorPosition = 0; // Index of the first button displayed in the list on the right
    static listLength = 0; // Number of buttons in the list on the right
    static lastCustomGate = ""; // Last custom gate loaded
    static lastGate = ""; // The last gate that was placed. Press space to place it again
    static buttons; // Buttons that should be displayed only in this mode

    // Events ----------------------------------------------------------------------------------------------------------

    static init() {

        // Create all the buttons of the list on the right
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
                .setOnClick(() => BuildMode.addGate(SerializerParser.parseCustomGate(BuildMode.lastCustomGate))),
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
                .setOnClick(() => BuildMode.addGate(GateFactory.CLOCK(mouseX, mouseY, 200))),
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
        BuildMode.buttons[1].drawCenter = function() {
            ctx.beginPath();
            ctx.moveTo(this.x - this.width/8, this.y + this.height/8);
            ctx.lineTo(this.x + this.width/8, this.y + this.height/8);
            ctx.lineTo(this.x, this.y - this.height/8);
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.fillStyle = "#379f1f";
            ctx.fill();

        };
        BuildMode.buttons[2].drawCenter = function() {
            ctx.beginPath();
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.lineTo(this.x + this.width/8, this.y - this.height/8);
            ctx.lineTo(this.x, this.y + this.height/8);
            ctx.moveTo(this.x - this.width/8, this.y - this.height/8);
            ctx.fillStyle = "#379f1f";
            ctx.fill();

        };
    }

    /*** Called when the user switches to this mode */
    static enable() {
        Interface.mode = 0;
        BuildMode.selectedGate = null;
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface update (begining of the frame calculation)*/
    static earlyUpdate() {

        if(BuildMode.selectedGate) {
            BuildMode.selectedGate.x = mouseX;
            BuildMode.selectedGate.y = mouseY;
        }
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface draw (end of the frame calculation)*/
    static lateUpdate() {

        // Displays the list of gates on the right

        // To limit problems we start by putting everything in the exterior of the screen
        for(let button of BuildMode.buttons) {
            button.x = -100;
            button.y = -100;
        }

        // Destroy button
        BuildMode.buttons[0].x = canvas.width - BuildMode.buttons[0].width/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[0].y = canvas.height - BuildMode.buttons[0].height/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[0].draw();

        // Calculates the number of buttons that can be displayed
        BuildMode.listLength = Math.floor(
            (canvas.height
                - BuildMode.buttons[0].height
                - 2*BuildMode.buttons[1].height
                - 5*Interface.BUTTON_SPACING)
            / (BuildMode.buttons[5].height+Interface.BUTTON_SPACING));
        // Avoids trying to display more buttons than we have if the screen to too large
        BuildMode.listLength = Math.min(BuildMode.listLength, BuildMode.buttons.length - 5);

        // Buttons to control the list (up and down)
        BuildMode.buttons[1].x = canvas.width - BuildMode.buttons[1].width/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[1].y = BuildMode.buttons[1].height/2 + Interface.BUTTON_SPACING;
        BuildMode.buttons[2].x = canvas.width - BuildMode.buttons[2].width/2 - Interface.BUTTON_SPACING;
        BuildMode.buttons[2].y = BuildMode.buttons[5].height*BuildMode.listLength + 1.5*BuildMode.buttons[1].height + Interface.BUTTON_SPACING*(2+BuildMode.listLength);
        BuildMode.buttons[1].draw();
        BuildMode.buttons[2].draw();

        // Updates the list if there is space on the bottom (if the user went down with small screen and then full screen)
        if(5+BuildMode.selectorPosition+BuildMode.listLength-1 >= BuildMode.buttons.length)
            BuildMode.selectorPosition = BuildMode.buttons.length-BuildMode.listLength-5;

        // Gate creation buttons
        for(let i = 0; i < BuildMode.listLength; i++) {

            if(BuildMode.selectorPosition+i+5 > BuildMode.buttons.length) // If there is no more buttons to display, breaks
                break;

            BuildMode.buttons[BuildMode.selectorPosition+i+5].x = canvas.width - BuildMode.buttons[5].width/2 - Interface.BUTTON_SPACING;
            BuildMode.buttons[BuildMode.selectorPosition+i+5].y = BuildMode.buttons[1].height + (i+0.5)*(BuildMode.buttons[5].height) + (i+2)*Interface.BUTTON_SPACING;
            BuildMode.buttons[BuildMode.selectorPosition+i+5].draw();
        }

        // Custom gate buttons
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

    /*** Called when the user clicks somewhere with this mode selected */
    static onClick() {

        if(BuildMode.selectedGate !== null)
            BuildMode.selectedGate = null;
        else
            BuildMode.selectedGate = Tools.getGateAtPosition(mouseX, mouseY);
    }

    /*** Called for each key press with this mode selected */
    static onKeyPressed(key) {
        if(key === 'Delete')
            BuildMode.removeGate(BuildMode.selectedGate);
        if(key === 'a')
            BuildMode.addGate(GateFactory.AND(mouseX, mouseY), false);
        if(key === 'o')
            BuildMode.addGate(GateFactory.OR(mouseX, mouseY), false);
        if(key === 'n')
            BuildMode.addGate(GateFactory.NOT(mouseX, mouseY), false);
        if(key === 'x')
            BuildMode.addGate(GateFactory.XOR(mouseX, mouseY), false);
        if(key === ' ') {
            if(BuildMode.lastGate === "CUSTOM")
                BuildMode.addGate(SerializerParser.parseCustomGate(BuildMode.lastCustomGate), false);
            else if(BuildMode.lastGate !== "") {
                const gateConstructor = GateFactory[BuildMode.lastGate];
                BuildMode.addGate(gateConstructor(mouseX,mouseY), false);
            }
        }
    }

    // Gates Management ------------------------------------------------------------------------------------------------

    /*** Opens the popup that asks for a string to build a CustomGate */
    static openCustomGatePopup() {
        Popup.open();
        Popup.addTitle("Custom Gate");
        Popup.addText("Data for your gate (you can generate it with the Build Custom Gate button)");
        Popup.addFields([{id: "rawData"}], " ");
        Popup.addDoneButton(() => {
            const gate = SerializerParser.parseCustomGate(document.getElementById("rawData").value);
            if(!gate) return; // Aborts if an error occured
            BuildMode.addGate(gate);
            BuildMode.lastCustomGate = gate.string;
            Popup.close();
        });
    }

    /*** Adds a gate to the simulation
     * Put select to automatically select the new gate */
    static addGate(gate, select) {

        if(select === undefined || select)
            BuildMode.selectedGate = gate;

        gate.id = Gate.nextID;
        Gate.nextID++;

        BuildMode.lastGate = gate.type;

        gates.push(gate);
    }

    /*** Removes a gate from the simulation */
    static removeGate(gate) {

        gates = gates.remove(gate);
        BuildMode.selectedGate = null;

        if(gate instanceof CustomGate)
            for(let outputGate of gate.outputGates)
                Gate.removeAllConnectionsTo(outputGate, gates);
        else
            Gate.removeAllConnectionsTo(gate, gates);
    }
}