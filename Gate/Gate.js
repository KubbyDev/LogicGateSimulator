class Gate {

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    activation;            //Fonction d'activation de la porte (exemple: and = a && b)
    inputs = [];           //References aux connections vers les portes auquelles cette portes est connectee
    tempOutput = false;    //La valeur de l'output pendant le tick. Il passe dans output a la fin du tick
    output = false;        //Valeur de la sortie de la porte
    maxInputs = 0;         //Le nombre d'inputs que cette porte accepte

    /***
     * Modifie les proprietes fonctionnelles de la gate
     * @param activation
     * @param inputs
     * @param maxInputs
     */
    setFonctionnalProperties(activation, inputs, maxInputs) {

        this.activation = activation;
        this.maxInputs = maxInputs !== undefined ? maxInputs : 0;
        this.setInputs(inputs !== undefined ? inputs : []);
        return this;
    }

    /***
     * Modifie les inputs de la gate
     * @param inputGates
     */
    setInputs(inputGates) {
        this.inputs = inputGates.map(inputGate => new Connection(this, inputGate)).slice(0,this.maxInputs);
        return this;
    }

    /***
     * Ajoute une entree a cette porte (ne fait rien si elle a deja tous ses inputs)
     * Met l'entree a un index precis si il est renseigne
     * @param gate
     * @param index
     */
    addInput(gate, index) {

        if(index !== undefined && index < this.maxInputs)
            this.inputs[index] = new Connection(this, gate);
        else if (this.inputs.length < this.maxInputs)
            this.inputs.push(new Connection(this, gate));
    }

    /***
     * Met a jour la sortie de la porte en fonction des entrees
     */
    update() {
        let inputs = this.inputs.map(connection => connection !== undefined && connection.getValue());
        this.tempOutput = this.activation(inputs);
    }

    /***
     * Appeller cette fonction a la fin de chaque tick pour mettre a jour sa sortie
     */
    tickEnd() {
        this.output = this.tempOutput;
    }

    /***
     * Met a jour les sorties de toutes les portes passees en parametre
     * @param gates
     */
    static updateAll(gates) {

        for(let gate of gates)
            gate.update();

        for(let gate of gates)
            gate.tickEnd();
    }

    /***
     * Supprime toutes les connections a la porte gate parmis les portes allGates
     * @param gate
     * @param allGates
     */
    static removeAllConnectionsTo(gate, allGates) {

        for(let g of allGates)
            for(let i = 0; i < g.inputs.length; i++)
                if(g.inputs[i] && g.inputs[i].destination === gate)
                    g.inputs[i] = undefined;
    }

    /***
     * Renvoie l'index du connecteur le plus proche.
     * Si c'est un input l'index sera positif (1 et +), negatif si c'est un output (-1 et -)
     * @param x
     * @param y
     */
    getConnector(x,y) {

        if(x > this.x || this.maxInputs < 1) //Si on est sur la droite de la porte ou qu'elle n'a pas d'inputs
            return -1; //renvoie l'output

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
     * Renvoie la porte correspondante pour un numero d'output donne
     * (Utile pour les portes custom)
     */
    getGateForOutput(index) {
        return this;
    }

    /***
     * Renvoie un string qui contient les caracteristique de la porte (la periode pour une clock par exemple)
     */
    serializeParameters() {
        return "";
    }

    /***
     * Applique les caracteristiques de la porte (Apellee dans CustomGate.parse)
     */
    parseParameters(parameters) {
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

    x = 10;
    y = 10;
    width = 20;
    height = 20;
    color = "#379f1f";
    type = "Gate";
    name = "Gate";
    fontSize = 8;
    hideName = false;

    /***
     * Modifie les proprietes graphiques de la gate
     * @param x
     * @param y
     * @param width
     * @param height
     * @param color
     * @param type
     */
    setGraphicProperties(x, y, width, height, color, type, name) {

        this.x = x;
        this.y = y;
        this.width = width * Interface.ZOOM_FACTOR;
        this.height = height * Interface.ZOOM_FACTOR;
        this.color = color;
        this.type = type;
        this.name = name !== undefined ? name : type;

        this.fontSize *= Interface.ZOOM_FACTOR;

        return this;
    }

    /***
     * Modifie la position du centre de la porte
     * @param x
     * @param y
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /***
     * Dessine la gate
     */
    draw() {

        this.drawBody();

        if(!this.hideName) {
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = this.fontSize + "px Arial";
            ctx.fillText(this.name, this.x, this.y);
        }
    }

    /***
     * Dessine le corps de la porte (cette methode peut etre redefinie pour une forme custom)
     */
    drawBody() {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }

    /***
     * Dessine toutes les portes passees en parametre
     * @param gates
     */
    static drawAll(gates) {

        //Dessine toutes les connections de chaque gate
        for(let gate of gates)
            for(let i = 0; i < gate.maxInputs; i++)
                if(gate.inputs[i])
                    gate.inputs[i].draw(i);

        //Dessine toutes les gates
        for(let gate of gates)
            gate.draw();
    }

    /***
     * Renvoie la position de l'input index sur la porte
     * @param index
     */
    getInputPosition(index) {
        return [
            this.x - this.width/2  + this.width/4,
            this.y - this.height/2 + this.height*(index+1)/(this.maxInputs+1)
        ]
    }

    /***
     * Renvoie la position de l'output sur la porte
     */
    getOutputPosition() {
        return [
            this.x + this.width/2 - Connection.WIDTH,
            this.y
        ]
    }
}