class Basic {

    static UP(x, y) {
        return new Gate()
            .setFonctionnalProperties(() => true, [])
            .setGraphicProperties(x,y,40,40,"#ae110b", "UP", "1");
    }

    static DOWN(x, y) {
        return new Gate()
            .setFonctionnalProperties(() => false, [])
            .setGraphicProperties(x,y,40,40,"#5f5f5f", "DOWN", "0");
    }

    static NOT(x, y, input) {

        let g = new Gate()
            .setFonctionnalProperties((i) => !i[0], input, 1)
            .setGraphicProperties(x,y,30,20,"#379f1f","NOT");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y - this.height/2);
            ctx.lineTo(this.x + this.width/2 - CIRCLE_RADIUS*2, this.y);
            ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
            ctx.lineTo(this.x - this.width/2, this.y - this.height/2);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            ctx.closePath();

            fillCircle(this.x + this.width/2 - CIRCLE_RADIUS, this.y);
        };
        g.hideName = true;

        return g;
    }

    static AND(x, y, inputs) {

        let g = new Gate()
            .setFonctionnalProperties((i) => i[0] && i[1], inputs, 2)
            .setGraphicProperties(x,y,40,40,"#379f1f","AND");

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

            ctx.closePath();
        };
        g.hideName = true;

        return g;
    }

    static OR(x, y, inputs) {
        let g = new Gate()
            .setFonctionnalProperties((i) => i[0] || i[1], inputs, 2)
            .setGraphicProperties(x,y,40,40,"#379f1f","OR");

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

            ctx.closePath();
        };
        g.hideName = true;

        return g;
    }

    static XOR(x, y, inputs) {
        let g = new Gate()
            .setFonctionnalProperties((i) => i[0] !== i[1], inputs, 2)
            .setGraphicProperties(x,y,45,40,"#379f1f","XOR");

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

            ctx.closePath();
            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4, this.y, this.x - this.width/2, this.y - this.height/2);

            ctx.lineWidth = 3;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            ctx.closePath();
        };
        g.hideName = true;

        return g;
    }

    static NAND(x, y, inputs) {

        let g = new Gate()
            .setFonctionnalProperties((i) => !(i[0] && i[1]), inputs, 2)
            .setGraphicProperties(x,y,50,40,"#379f1f","NAND");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y - this.height/2);
            ctx.lineTo(this.x + this.width/2 - this.height/2 - CIRCLE_RADIUS*2, this.y - this.height/2);
            ctx.arc(this.x + this.width/2 - this.height/2 - CIRCLE_RADIUS*2, this.y, this.height/2, -Math.PI/2, Math.PI/2);
            ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
            ctx.lineTo(this.x - this.width/2, this.y - this.height/2);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            ctx.closePath();

            fillCircle(this.x + this.width/2 - CIRCLE_RADIUS, this.y);
        };
        g.hideName = true;

        return g;
    }

    static NOR(x, y, inputs) {

        let g = new Gate()
            .setFonctionnalProperties((i) => !(i[0] || i[1]), inputs, 2)
            .setGraphicProperties(x,y,50,40,"#379f1f","NOR");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4, this.y, this.x - this.width/2, this.y - this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*CIRCLE_RADIUS, this.y - this.height/2, this.x + this.width/2 - 2*CIRCLE_RADIUS, this.y);
            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*CIRCLE_RADIUS, this.y + this.height/2, this.x + this.width/2 - 2*CIRCLE_RADIUS, this.y);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            ctx.closePath();

            fillCircle(this.x + this.width/2 - CIRCLE_RADIUS, this.y);
        };
        g.hideName = true;

        return g;
    }

    static XNOR(x, y, inputs) {
        let g = new Gate()
            .setFonctionnalProperties((i) => i[0] === i[1], inputs, 2)
            .setGraphicProperties(x,y,55,40,"#379f1f","XNOR");

        g.drawBody = function() {

            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2 + this.width/8, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4 + this.width/8, this.y, this.x - this.width/2 + this.width/8, this.y - this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*CIRCLE_RADIUS, this.y - this.height/2, this.x + this.width/2 - 2*CIRCLE_RADIUS, this.y);
            ctx.moveTo(this.x - this.width/2 + this.width/8, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x + this.width/4 - 2*CIRCLE_RADIUS, this.y + this.height/2, this.x + this.width/2 - 2*CIRCLE_RADIUS, this.y);

            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            ctx.closePath();
            ctx.beginPath();

            ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
            ctx.quadraticCurveTo(this.x - this.width/4, this.y, this.x - this.width/2, this.y - this.height/2);

            ctx.lineWidth = 3;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            ctx.closePath();

            fillCircle(this.x + this.width/2 - CIRCLE_RADIUS, this.y);
        };
        g.hideName = true;

        return g;
    }

    static INPUT(x, y) {
        return new Input()
            .setGraphicProperties(x,y,40,40,"#db7ed2", "INPUT")
    }

    static CLOCK(x, y, period) {
        return new Clock()
            .setPeriod(period)
            .setGraphicProperties(x,y,40,40,"#3d79e7", "CLOCK");
    }

    static OUTPUT(x, y, input) {
        return new Output()
            .setFonctionnalProperties((i) => i[0], input, 1)
            .setGraphicProperties(x,y,40,40,"#000000", "OUTPUT", "")
    }

    static NODE(x,y, input) {
        return new ConnectionNode()
            .setFonctionnalProperties((i) => i[0], input, 1)
            .setGraphicProperties(x,y,10,7,"#000000", "NODE", "")
    }

    static SWITCH(x, y, input) {
        return new Switch()
            .setFonctionnalProperties((i) => i[0], input, 1)
            .setGraphicProperties(x,y,45,20,"#ffbb25", "SWITCH")
    }
}