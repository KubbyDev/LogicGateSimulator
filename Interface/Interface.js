let interfaceBackgroundColor = "#353535";
let interfaceButtonSpacing = 5;
let interfaceZoomFactor = 1; //Plus ce nombre est grand, plus les portes seront grossies
let interfaceMode = 0;
let interfaceBlockInputs = false;
let interfaceButtons = [];

class Interface {

    //0 = BUILD: cliquer une fois pour selectionner une porte, puis une autre fois pour la placer
    //Cliquer sur les portes a droite pour les ajouter, ou drag une porte dans la poubelle pour la supprimer

    //1 = CONNECTION: Cliquer sur une porte pour la selectionner, puis sur une autre porte pour la connecter

    //2 = INTERACTION: Cliquer sur un interrupteur pour changer son etat

    static clear() {
        ctx.fillStyle = interfaceBackgroundColor;
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }

    /***
     * Dessine le menu contextuel du mode actuel
     */
    static draw() {

        Interface.getCurrentMode().updateContextualMenu();

        interfaceButtons[0].x = (0.5)*interfaceButtons[0].width + interfaceButtonSpacing;
        interfaceButtons[0].y = interfaceButtons[0].height/2 + interfaceButtonSpacing;
        interfaceButtons[1].x = (1.5)*interfaceButtons[0].width + 2*interfaceButtonSpacing;
        interfaceButtons[1].y = interfaceButtons[0].height/2 + interfaceButtonSpacing;
        interfaceButtons[2].x = (2.5)*interfaceButtons[0].width + 3*interfaceButtonSpacing;
        interfaceButtons[2].y = interfaceButtons[0].height/2 + interfaceButtonSpacing;
        interfaceButtons[0].draw();
        interfaceButtons[1].draw();
        interfaceButtons[2].draw();
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
                .setGraphicProperties(90, 40, "Build", "#ffffff")
                .setOnClick(() => BuildMode.enable()),
            new Button()
                .setGraphicProperties(90, 40, "Wiring", "#ffffff")
                .setOnClick(() => WiringMode.enable()),
            new Button()
                .setGraphicProperties(90, 40, "Interaction", "#ffffff")
                .setOnClick(() => InteractionMode.enable())
            ];
    }

    static update() {
        Interface.getCurrentMode().update();
    }

    /***
     * Renvoie la classe correspondant au mode actuel (Build, Wiring ou Interaction)
     * @returns {*}
     */
    static getCurrentMode() {
        switch(interfaceMode) {
            case 0: return BuildMode;
            case 1: return WiringMode;
            case 2: return InteractionMode;
        }
    }

    /***
     * Zoome ou dezoome
     * @param factor
     */
    static zoom(factor) {

        interfaceZoomFactor *= factor;
        CIRCLE_RADIUS *= factor;
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

