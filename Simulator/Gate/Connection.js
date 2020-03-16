class Connection {

    /*
        This class represents a connection between two gates
        Connections start from an Gate's input and go backward to reach another Gate's output
     */

    static downColor = "#d3d3d3";
    static upColor = "#ffbf00";

    constructor(origin, destination) {
        this.destination = destination;  // The gate from which this connection starts (this connection is the output of this gate)
        this.origin = origin;            // The gate that contains this connection (this connection is an input of this gate)
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    /*** Returns the gate that determines the state of this connection
     * Generally it is just this.destination. But if this.destination is a Node,
     * we have to go further because Nodes don't slow down current
     * Don't pay attention to the argument, it's used in case of a recursive call to avoid stackoverflow */
    getInput(visited) {

        // If the destination is a Node
        if(this.destination instanceof ConnectionNode) {

            // If it's the first call then visited is not defined
            if(visited === undefined)
                visited = [];

            // If the destination is already visited, stops and returns undefined (the connection has no input)
            if(visited.includes(this.destination.id))
                return undefined;

            visited.push(this.destination.id);

            // If the Node has an input, does a recursive call on it. Otherwise the connection has no input
            if(this.destination.inputs[0])
                return this.destination.inputs[0].getInput(visited);

            return undefined;
        }

        return this.destination;
    }

    /*** Returns the state of this connection */
    getValue() {
        return this.getInput() !== undefined && this.getInput().output !== undefined && this.getInput().output;
    }

    // Graphical properties --------------------------------------------------------------------------------------------

    /*** Draws the connection
     * @param i: index of the input on which this connection is on the origin */
    draw(i) {

        const inputPosition = this.origin.getInputPosition(i); // Position of the connection on the input side of the origin
        const outputPosition = this.destination.getOutputPosition(); // Position of the connection on the ouput side of the destination

        ctx.beginPath();
        ctx.moveTo(inputPosition[0] + this.origin.width/4, inputPosition[1]);

        for(let point of this.calculateIntermediates(outputPosition[0], outputPosition[1], inputPosition[0], inputPosition[1]))
            ctx.lineTo(point[0], point[1]);

        ctx.lineTo(outputPosition[0], outputPosition[1]);

        ctx.lineWidth = Interface.connectionWidth;
        ctx.strokeStyle = this.getValue() ? Connection.upColor : Connection.downColor;
        ctx.stroke();

    }

    /*** Calculates the intermediates through which the connection goes before arriving to its destination
     * From is the destination, To is the origin */
    calculateIntermediates(fromX, fromY, toX, toY) {

        const averageX = (toX + fromX) /2;
        const averageY = (toY + fromY) /2;

        // Case where the origin is behind the destination
        if(toX - Interface.connectionGap < fromX + Interface.connectionGap)
            return [
                [toX - Interface.connectionGap, toY],
                [toX - Interface.connectionGap, averageY],
                [fromX + Interface.connectionGap, averageY],
                [fromX + Interface.connectionGap, fromY],
            ];
        else
            return [
                [averageX, toY],
                [averageX, fromY]
            ];
    }
}