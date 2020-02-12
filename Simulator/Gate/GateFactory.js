/*
This class contains functions to generate all the gates that are not custom gates
 */
class GateFactory {

    static UP(x, y) {
        return new Gate()
            .setFonctionnalProperties("UP", () => true, [])
            .setGraphicProperties(x,y,40,40,"#ae110b", "1");
    }

    static DOWN(x, y) {
        return new Gate()
            .setFonctionnalProperties("DOWN", () => false, [])
            .setGraphicProperties(x,y,40,40,"#5f5f5f", "0");
    }

    static NOT(x, y, input) {

        let g = new Gate()
            .setFonctionnalProperties("NOT", (i) => !i[0], input, 1)
            .setGraphicProperties(x, y, 30, 20, "#379f1f");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y - this.height/2);
            ctx.lineTo(this.x + this.width/2 - circleRadius*2, this.y);
            ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
            ctx.lineTo(this.x - this.width/2, this.y - this.height/2);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            fillCircle(this.x + this.width/2 - circleRadius, this.y, circleRadius);
        };
        g.hideName = true;

        return g;
    }

    static AND(x, y, inputs) {

        let g = new Gate()
            .setFonctionnalProperties("AND", (i) => i[0] && i[1], inputs, 2)
            .setGraphicProperties(x, y, 40, 40, "#379f1f");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y - this.height/2);
            ctx.lineTo(this.x + this.width/2 - this.height/2, this.y - this.height/2);
            ctx.arc(this.x + this.width/2 - this.height/2, this.y, this.height/2, -Math.PI/2, Math.PI/2);
            ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
            ctx.lineTo(this.x - this.width/2, this.y - this.height/2);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        };
        g.hideName = true;

        return g;
    }

    static OR(x, y, inputs) {
        let g = new Gate()
            .setFonctionnalProperties("OR", (i) => i[0] || i[1], inputs, 2)
            .setGraphicProperties(x, y, 40, 40, "#379f1f");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4, this.y, this.x - this.width/2, this.y - this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4, this.y - this.height/2, this.x + this.width/2, this.y);
            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4, this.y + this.height/2, this.x + this.width/2, this.y);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        };
        g.hideName = true;

        return g;
    }

    static XOR(x, y, inputs) {
        let g = new Gate()
            .setFonctionnalProperties("XOR", (i) => i[0] !== i[1], inputs, 2)
            .setGraphicProperties(x, y, 45, 40, "#379f1f");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2 + this.width/8, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4 + this.width/8, this.y, this.x - this.width/2 + this.width/8, this.y - this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4, this.y - this.height/2, this.x + this.width/2, this.y);
            ctx.moveTo(this.x - this.width/2 + this.width/8, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4, this.y + this.height/2, this.x + this.width/2, this.y);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();


            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4, this.y, this.x - this.width/2, this.y - this.height/2);

            ctx.lineWidth = 3;
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        };
        g.hideName = true;

        return g;
    }

    static NAND(x, y, inputs) {

        let g = new Gate()
            .setFonctionnalProperties("NAND", (i) => !(i[0] && i[1]), inputs, 2)
            .setGraphicProperties(x, y, 50, 40, "#379f1f");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y - this.height/2);
            ctx.lineTo(this.x + this.width/2 - this.height/2 - circleRadius*2, this.y - this.height/2);
            ctx.arc(this.x + this.width/2 - this.height/2 - circleRadius*2, this.y, this.height/2, -Math.PI/2, Math.PI/2);
            ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
            ctx.lineTo(this.x - this.width/2, this.y - this.height/2);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            fillCircle(this.x + this.width/2 - circleRadius, this.y, circleRadius);
        };
        g.hideName = true;

        return g;
    }

    static NOR(x, y, inputs) {

        let g = new Gate()
            .setFonctionnalProperties("NOR", (i) => !(i[0] || i[1]), inputs, 2)
            .setGraphicProperties(x, y, 50, 40, "#379f1f");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4, this.y, this.x - this.width/2, this.y - this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*circleRadius, this.y - this.height/2, this.x + this.width/2 - 2*circleRadius, this.y);
            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*circleRadius, this.y + this.height/2, this.x + this.width/2 - 2*circleRadius, this.y);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();



            fillCircle(this.x + this.width/2 - circleRadius, this.y, circleRadius);
        };
        g.hideName = true;

        return g;
    }

    static XNOR(x, y, inputs) {
        let g = new Gate()
            .setFonctionnalProperties("XNOR", (i) => i[0] === i[1], inputs, 2)
            .setGraphicProperties(x, y, 55, 40, "#379f1f");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2 + this.width/8, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4 + this.width/8, this.y, this.x - this.width/2 + this.width/8, this.y - this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*circleRadius, this.y - this.height/2, this.x + this.width/2 - 2*circleRadius, this.y);
            ctx.moveTo(this.x - this.width/2 + this.width/8, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*circleRadius, this.y + this.height/2, this.x + this.width/2 - 2*circleRadius, this.y);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();


            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4, this.y, this.x - this.width/2, this.y - this.height/2);

            ctx.lineWidth = 3;
            ctx.strokeStyle = "#000000";
            ctx.stroke();



            fillCircle(this.x + this.width/2 - circleRadius, this.y, circleRadius);
        };
        g.hideName = true;

        return g;
    }

    static INPUT(x, y) {
        return new Input()
            .setFonctionnalProperties("INPUT")
            .setGraphicProperties(x, y, 40, 40, "#db7ed2")
    }

    static CLOCK(x, y, period) {
        return new Clock()
            .setPeriod(period)
            .setFonctionnalProperties("CLOCK")
            .setGraphicProperties(x, y, 40, 40, "#3d79e7");
    }

    static OUTPUT(x, y, input) {
        return new Output()
            .setFonctionnalProperties("OUTPUT", (i) => i[0], input, 1)
            .setGraphicProperties(x, y, 40, 40, "#7a7a7a")
            .setHideName(true);
    }

    static NODE(x,y, input) {
        return new ConnectionNode()
            .setFonctionnalProperties("NODE", (i) => i[0], input, 1)
            .setGraphicProperties(x, y, 10, 7, "#7a7a7a")
            .setHideName(true);
    }

    static SWITCH(x, y, input) {
        return new Switch()
            .setFonctionnalProperties("SWITCH", (i) => i[0], input, 1)
            .setGraphicProperties(x, y, 45, 20, "#ffbb25")
    }
}