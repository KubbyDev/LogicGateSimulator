class Interface {

    //Interface modes: 0 = Build, 1: Wiring, 2: Interaction

    static BACKGROUND_COLOR = "#353535";
    static BUTTON_SPACING = 5;

    static zoomFactor = 1; // The bigger this number is, the bigger the gates will be
    static mode = 0;
    static blockInputs = false;
    static buttons = [];

    static negCircleR = 5; // Radius of the circle that represents negation on gates
    static connectionWidth = 3; // Width of the lines representing connections

    static clear() {
        ctx.fillStyle = Interface.BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    static draw() {

        Interface.getCurrentMode().lateUpdate();

        // Mode selection buttons
        Interface.buttons[0].x = canvas.width/2 - Interface.buttons[0].width - Interface.BUTTON_SPACING;
        Interface.buttons[0].y = Interface.buttons[0].height/2 + Interface.BUTTON_SPACING;
        Interface.buttons[1].x = canvas.width/2;
        Interface.buttons[1].y = Interface.buttons[0].height/2 + Interface.BUTTON_SPACING;
        Interface.buttons[2].x = canvas.width/2 + Interface.buttons[0].width + Interface.BUTTON_SPACING;
        Interface.buttons[2].y = Interface.buttons[0].height/2 + Interface.BUTTON_SPACING;
        Interface.buttons[0].draw();
        Interface.buttons[1].draw();
        Interface.buttons[2].draw();

        // Save / Load buttons
        Interface.buttons[3].x = (0.5)*Interface.buttons[3].width + Interface.BUTTON_SPACING;
        Interface.buttons[3].y = (0.5)*Interface.buttons[3].height + Interface.BUTTON_SPACING;
        Interface.buttons[4].x = (1.5)*Interface.buttons[3].width + 2*Interface.BUTTON_SPACING;
        Interface.buttons[4].y = (0.5)*Interface.buttons[3].height + Interface.BUTTON_SPACING;
        Interface.buttons[3].draw();
        Interface.buttons[4].draw();

        // Play / Pause button
        Interface.buttons[5].x = (0.5)*Interface.buttons[5].width + Interface.BUTTON_SPACING;
        Interface.buttons[5].y = (0.5)*Interface.buttons[5].height + Interface.buttons[3].height + 2*Interface.BUTTON_SPACING;
        Interface.buttons[5].draw();

        // Next frame button (Only if the simulator is paused)
        if(framesToCalculate === 0) {
            Interface.buttons[6].x = (1.5) * Interface.buttons[6].width + 2 * Interface.BUTTON_SPACING;
            Interface.buttons[6].y = (0.5) * Interface.buttons[6].height + Interface.buttons[4].height + 2 * Interface.BUTTON_SPACING;
            Interface.buttons[6].draw();
        }
        else {
            Interface.buttons[6].x = -1000
            Interface.buttons[6].y = -1000;
        }
    }

    static getButtonAtPosition(x, y) {

        for (let button of Interface.getCurrentMode().buttons.concat(Interface.buttons))
            if (Math.abs(x - button.x) < button.width / 2 && Math.abs(y - button.y) < button.height / 2)
                return button;

        return null;
    }

    static init() {

        BuildMode.init();
        WiringMode.init();
        InteractionMode.init();

        Interface.buttons = [
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
                .setOnClick(() => SimulatorState.save()()),
            new Button()
                .setGraphicProperties(50, 40, "Load", "#00e1ff")
                .setOnClick(() => SimulatorState.askForSave()),
            new Button()
                .setGraphicProperties(30, 30, "", "#ff9100")
                .setOnClick(() => framesToCalculate = - !framesToCalculate), // Sets to -1 if the current value is 0, 0 otherwise
            new Button()
                .setGraphicProperties(30, 30, "", "#ff9100")
                .setOnClick(() => { if(framesToCalculate >= 0) framesToCalculate++; }),
        ];

        // Pause/Play button
        Interface.buttons[5].drawCenter = function() {
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
        Interface.buttons[6].drawCenter = function() {
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
        Interface.getCurrentMode().earlyUpdate();
    }

    /*** Returns the class that handles the selected mode */
    static getCurrentMode() {
        switch(Interface.mode) {
            case 0: return BuildMode;
            case 1: return WiringMode;
            case 2: return InteractionMode;
        }
    }

    static zoom(factor) {

        Interface.zoomFactor *= factor;
        Interface.negCircleR *= factor;
        Interface.connectionWidth *= factor;

        for(let gate of gates) {

            gate.width *= factor;
            gate.height *= factor;

            gate.x = (gate.x - mouseX)*factor + mouseX;
            gate.y = (gate.y - mouseY)*factor + mouseY;

            gate.fontSize *= factor;
        }
    }
}

