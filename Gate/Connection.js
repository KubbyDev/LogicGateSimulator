class Connection {

    constructor(origin, destination) {
        this.destination = destination;
        this.origin = origin;
    }

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    destination;   //La gate de laquelle cette connection part (output d'une porte)
    origin;        //La gate qui contient cette connection (cette connection est donc son input)

    /***
     * Renvoie la porte qui determine l'etat de cette connection
     * En general c'est destination, mais si destination est un Node
     * Faut remonter plus loin
     */
    getInput() {

        if(this.destination instanceof ConnectionNode)
            if(this.destination.inputs[0])
                return this.destination.inputs[0].getInput();
            else
                return undefined;

        return this.destination;
    }

    /***
     * Renvoie l'etat (on/off) de la connexion
     */
    getValue() {
        return this.getInput() !== undefined && this.getInput().output;
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

    static WIDTH = 3;
    static DOWN_COLOR = "#d3d3d3";
    static UP_COLOR = "#ea120c";

    /***
     * Dessine la connexion
     * @param i: index de l'input sur la porte a laquelle cette connexion est connectee
     */
    draw(i) {

        let inputPosition = this.origin.getInputPosition(i); //Position de la connection sur le cote input de l'origine
        let outputPosition = this.destination.getOutputPosition(); //Position de la connection sur le cote output de la destination

        //Dessine la connection
        ctx.beginPath();
        ctx.moveTo(inputPosition[0], inputPosition[1]);
        for(let point of this.calculateIntermediates(this.destination.x, this.destination.y, this.origin.x, inputPosition[1]))
            ctx.lineTo(point[0], point[1]);
        ctx.lineTo(outputPosition[0], outputPosition[1]);
        ctx.lineWidth = Connection.WIDTH;
        ctx.strokeStyle = this.getValue() ? Connection.UP_COLOR : Connection.DOWN_COLOR;
        ctx.stroke();
        ctx.closePath();
    }

    /***
     * Calcule les points intermediaires par lesquels cette connexion passe avant d'arriver a sa cible
     * From est la porte qui a la connection comme output, To est celle qui a la connection comme input
     */
    calculateIntermediates(fromX, fromY, toX, toY) {

        let averageX = (toX + fromX) /2;
        let averageY = (toY + fromY) /2;

        if(toX - this.origin.width/2 - this.origin.width/6 < fromX + this.destination.width/2 + this.destination.width/6) //Cas ou la porte d'arrivee est derriere la porte de depart
            return [
                [toX - this.origin.width/2 - this.origin.width/6, toY],
                [toX - this.origin.width/2 - this.origin.width/6, averageY],
                [fromX + this.destination.width/2 + this.destination.width/6, averageY],
                [fromX + this.destination.width/2 + this.destination.width/6, fromY],
            ];
        else
            return [
                [averageX, toY],
                [averageX, fromY]
            ];
    }
}