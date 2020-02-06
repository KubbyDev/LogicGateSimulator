let interfaceBackgroundColor = "#353535";
let interfaceButtonSpacing = 5;
let interfaceZoomFactor = 1; // The bigger this number is, the bigger the gates will be
let interfaceMode = 0;
let interfaceBlockInputs = false;
let interfaceButtons = [];

class Interface {

    //Interface modes: 0 = Build, 1: Wiring, 2: Interaction

    static clear() {
        ctx.fillStyle = interfaceBackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    static draw() {

        Interface.getCurrentMode().updateContextualMenu();

        // Mode selection buttons
        interfaceButtons[0].x = canvas.width/2 - interfaceButtons[0].width - interfaceButtonSpacing;
        interfaceButtons[0].y = interfaceButtons[0].height/2 + interfaceButtonSpacing;
        interfaceButtons[1].x = canvas.width/2;
        interfaceButtons[1].y = interfaceButtons[0].height/2 + interfaceButtonSpacing;
        interfaceButtons[2].x = canvas.width/2 + interfaceButtons[0].width + interfaceButtonSpacing;
        interfaceButtons[2].y = interfaceButtons[0].height/2 + interfaceButtonSpacing;
        interfaceButtons[0].draw();
        interfaceButtons[1].draw();
        interfaceButtons[2].draw();

        // Save / Load buttons
        interfaceButtons[3].x = (0.5)*interfaceButtons[3].width + interfaceButtonSpacing;
        interfaceButtons[3].y = (0.5)*interfaceButtons[3].height + interfaceButtonSpacing;
        interfaceButtons[4].x = (1.5)*interfaceButtons[3].width + 2*interfaceButtonSpacing;
        interfaceButtons[4].y = (0.5)*interfaceButtons[3].height + interfaceButtonSpacing;
        interfaceButtons[3].draw();
        interfaceButtons[4].draw();

        // Play / Pause button
        interfaceButtons[5].x = (0.5)*interfaceButtons[5].width + interfaceButtonSpacing;
        interfaceButtons[5].y = (0.5)*interfaceButtons[5].height + interfaceButtons[3].height + 2*interfaceButtonSpacing;
        interfaceButtons[5].draw();

        // Next frame button (Only if the simulator is paused)
        if(framesToCalculate === 0) {
            interfaceButtons[6].x = (1.5) * interfaceButtons[6].width + 2 * interfaceButtonSpacing;
            interfaceButtons[6].y = (0.5) * interfaceButtons[6].height + interfaceButtons[4].height + 2 * interfaceButtonSpacing;
            interfaceButtons[6].draw();
        }
        else {
            interfaceButtons[6].x = -1000
            interfaceButtons[6].y = -1000;
        }
    }

    static getButtonAtPosition(x, y) {

        for (let button of Interface.getCurrentMode().buttons.concat(interfaceButtons))
            if (Math.abs(x - button.x) < button.width / 2 && Math.abs(y - button.y) < button.height / 2)
                return button;

        return null;
    }

    static init() {

        BuildMode.init();
        WiringMode.init();
        InteractionMode.init();

        interfaceButtons = [
            new Button()
                .setGraphicProperties(90, 30, "Build", "#ffffff")
                .setOnClick(() => BuildMode.enable()),
            new Button()
                .setGraphicProperties(90, 30, "Wiring", "#ffffff")
                .setOnClick(() => WiringMode.enable()),
            new Button()
                .setGraphicProperties(90, 30, "Interaction", "#ffffff")
                .setOnClick(() => InteractionMode.enable()),
            new Button()
                .setGraphicProperties(50, 40, "Save", "#00e1ff")
                .setOnClick(() => saveSimulatorState()),
            new Button()
                .setGraphicProperties(50, 40, "Load", "#00e1ff")
                .setOnClick(() => askForStateSave()),
            new Button()
                .setGraphicProperties(30, 30, "", "#ff9100")
                .setOnClick(() => framesToCalculate = - !framesToCalculate), // Sets to -1 if the current value is 0, 0 otherwise
            new Button()
                .setGraphicProperties(30, 30, "", "#ff9100")
                .setOnClick(() => { if(framesToCalculate >= 0) framesToCalculate++; }),
        ];

        // Pause/Play button
        interfaceButtons[5].drawCenter = function() {
            ctx.beginPath();

            // If the simulator is paused
            if (framesToCalculate === 0) {
                ctx.moveTo(this.x - this.width/4, this.y - this.height/4);
                ctx.lineTo(this.x - this.width/4, this.y + this.height/4);
                ctx.lineTo(this.x + this.width / 4, this.y);
            }
            // If the simulator is simulating
            else {
                ctx.moveTo(this.x - this.width / 10 + this.width / 6, this.y + this.height / 4);
                ctx.lineTo(this.x - this.width / 10 + this.width / 6, this.y - this.height / 4);
                ctx.lineTo(this.x + this.width / 10 + this.width / 6, this.y - this.height / 4);
                ctx.lineTo(this.x + this.width / 10 + this.width / 6, this.y + this.height / 4);

                ctx.moveTo(this.x - this.width / 10 - this.width / 6, this.y + this.height / 4);
                ctx.lineTo(this.x - this.width / 10 - this.width / 6, this.y - this.height / 4);
                ctx.lineTo(this.x + this.width / 10 - this.width / 6, this.y - this.height / 4);
                ctx.lineTo(this.x + this.width / 10 - this.width / 6, this.y + this.height / 4);
            }

            ctx.fillStyle = "#ff9100";
            ctx.fill();

        };
        // Next frame button
        interfaceButtons[6].drawCenter = function() {
            ctx.beginPath();

            ctx.moveTo(this.x - this.width / 20 - this.width / 6, this.y + this.height / 4);
            ctx.lineTo(this.x - this.width / 20 - this.width / 6, this.y - this.height / 4);
            ctx.lineTo(this.x + this.width / 20 - this.width / 6, this.y - this.height / 4);
            ctx.lineTo(this.x + this.width / 20 - this.width / 6, this.y + this.height / 4);

            ctx.moveTo(this.x, this.y - this.height/4);
            ctx.lineTo(this.x, this.y + this.height/4);
            ctx.lineTo(this.x + this.width / 4, this.y);

            ctx.fillStyle = "#ff9100";
            ctx.fill();
        };
    }

    static update() {
        Interface.getCurrentMode().update();
    }

    /*** Returns the class that handles the selected mode */
    static getCurrentMode() {
        switch(interfaceMode) {
            case 0: return BuildMode;
            case 1: return WiringMode;
            case 2: return InteractionMode;
        }
    }

    static zoom(factor) {

        interfaceZoomFactor *= factor;
        circleRadius *= factor;
        connectionWidth *= factor;

        for(let gate of gates) {

            gate.width *= factor;
            gate.height *= factor;

            gate.x = (gate.x - mouseX)*factor + mouseX;
            gate.y = (gate.y - mouseY)*factor + mouseY;

            gate.fontSize *= factor;
        }
    }

    static openPopup() {

        popupBackground.style.display = 'block';
        interfaceBlockInputs = true;
    }

    static closePopup() {

        let mainDiv = document.getElementById("popup_main_div");
        let child = mainDiv.lastElementChild;
        while (child) {
            mainDiv.removeChild(child);
            child = mainDiv.lastElementChild;
        }

        popupBackground.style.display = 'none';
        interfaceBlockInputs = false;
    }
}

