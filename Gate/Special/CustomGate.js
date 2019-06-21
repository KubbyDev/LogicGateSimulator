class CustomGate extends Gate {

    constructor() {
        super();
        this.internGates = []; //Liste des portes contenues dans cette CustomGate
        this.inputGates = [];  //Liste des portes qui servent d'input. Ils ne sont pas presents dans internGates
        this.outputGates = []; //Liste des Nodes qui servent d'output. Ils ne sont pas presents dans internGates
        this.string = "";      //String de donnees a partir duquel cette porte a ete construite
    }

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    update() {

        //Recupere les valeurs d'entrees et les met dans les inputGates
        for(let i = 0; i < this.inputGates.length; i++)
            this.inputGates[i].output = this.inputs[i] && this.inputs[i].getValue();

        for(let gate of this.internGates)
            gate.update();
    }

    tickEnd() {
        for(let gate of this.internGates)
            gate.tickEnd();
    }

    /***
     * Renvoie la porte correspondante pour un numero d'output donne
     */
    getGateForOutput(index) {
        return this.outputGates[index];
    }

    /***
     * Renvoie l'index du connecteur le plus proche.
     * Si c'est un input l'index sera positif (1 et +), negatif si c'est un output (-1 et -)
     * @param x
     * @param y
     */
    getConnector(x,y) {

        if(x > this.x || this.maxInputs < 1) { //Si on est sur la droite de la porte ou qu'elle n'a pas d'inputs

            let minDistY = Infinity;
            let minIndex = 0;
            for(let i = 0; i < this.outputGates.length; i++) {
                let dist = Math.abs(this.y - this.height/2 + this.height*(i+1)/(this.outputGates.length+1) - y);
                if(dist < minDistY) {
                    minIndex = i+1;
                    minDistY = dist;
                }
            }

            return -minIndex;
        }

        let minDistY = Infinity;
        let minIndex = 0;
        for(let i = 0; i < this.maxInputs; i++) {
            let dist = Math.abs(this.getInputPosition(i)[1] - y);
            if(dist < minDistY) {
                minIndex = i+1;
                minDistY = dist;
            }
        }

        return minIndex;
    }

    /***
     * Affiche un popup qui montre le string serialise de la porte
     */
    onClick() {

        Interface.openPopup();

        let mainDiv = document.getElementById("popup_main_div");
        let div = document.createElement("DIV");

        let separator = document.createElement("HR");
        div.appendChild(separator);

        let p = document.createElement("P");
        p.innerHTML = this.string;
        p.style.wordWrap = "break-word";
        div.appendChild(p);

        let button = document.createElement("BUTTON");
        button.addEventListener('click', Interface.closePopup);
        button.innerHTML = "OK";
        div.appendChild(button);

        mainDiv.appendChild(div);
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

    draw() {

        //Met a jour la position des outputs pour que les connexions s'affichent correctement
        for(let i = 0; i < this.outputGates.length; i++) {

            let position = this.getOutputPosition(i);
            this.outputGates[i].x = position[0];
            this.outputGates[i].y = position[1];
        }

        super.draw();

        //Affiche les noms des inputs et outputs
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = (this.fontSize*0.8) + "px Arial";
        for(let i = 0; i < this.outputGates.length; i++) {
            let position = this.getOutputPosition(i);
            ctx.fillText(this.outputGates[i].name, position[0] - this.width/10, position[1]);
        }
        for(let i = 0; i < this.inputGates.length; i++) {
            let position = this.getInputPosition(i);
            ctx.fillText(this.inputGates[i].name, position[0] - this.width/10, position[1]);
        }
    }

    /***
     * Renvoie la position de l'output index sur la porte
     * @param index
     */
    getOutputPosition(index) {
        return [
            this.x + this.width/2 - connectionWidth,
            this.y - this.height/2 + this.height*(index+1)/(this.outputGates.length+1)
        ]
    }

    /***
     * Affiche le menu de selection de noms des inputs/outputs pour creer une nouvelle custom gate
     */
    static openPopup() {

        Interface.openPopup();

        //Compte le nombre d'inputs et d'outputs de la Custom Gate
        let nbInputs = 0;
        let nbOutputs = 0;
        for(let gate of gates) {
            if(gate instanceof Input)
                nbInputs++;
            if(gate instanceof Output)
                nbOutputs++;
        }

        let mainDiv = document.getElementById("popup_main_div");
        let div = document.createElement("DIV");

        function addInput(name) {
            let input = document.createElement("INPUT");
            input.id = name;
            input.minlength="0";
            input.maxlength="6";
            div.appendChild(input);
        }

        function addSeparator(name) {
            let separator = document.createElement("HR");
            separator.innerHTML = name;
            div.appendChild(separator);
        }

        addSeparator("Gate name");
        addInput("name");

        //Cree les fields pour les inputs
        addSeparator("Input names");
        for(let i = 0; i < nbInputs; i++)
            addInput("input" + i);

        //Cree les fields pour les outputs
        addSeparator("Output names");
        for(let i = 0; i < nbOutputs; i++)
            addInput("output" + i);

        addSeparator("");
        let button = document.createElement("BUTTON");
        button.addEventListener('click', () => {

            //Recuperation des inputs
            let inputs = [];
            for(let i = 0; i < nbInputs; i++)
                inputs[i] = document.getElementById("input" + i).value;

            //Recuperation des outputs
            let outputs = [];
            for(let i = 0; i < nbOutputs; i++)
                outputs[i] = document.getElementById("output" + i).value;

            //Creation de la porte
            let gate = SerializerParser.parseCustomGate(SerializerParser.serializeCustomGate(document.getElementById("name").value, inputs, outputs));
            gates.push(gate);

            //Affichage de l'interface pour afficher le string serialise
            Interface.closePopup();
            gate.onClick();

            //Enregistrement de cette porte comme lastCustomGate
            buildModeLastCustomGate = gate.string;
        });
        button.innerHTML = "Done";
        div.appendChild(button);
        mainDiv.appendChild(div);
    }
}