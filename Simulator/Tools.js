class Tools {

    /*** Draws a circle */
    static fillCircle(x, y, radius, fillColor, drawBounds, boundsColor) {

        ctx.beginPath();
        ctx.fillStyle = fillColor || "#ffffff";
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();

        if (drawBounds === undefined || drawBounds) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = boundsColor || "#000000";
            ctx.stroke();
        }
    }

    /*** Forces the canvas to take the entire page */
    static resizeCanvas() {
        canvas.width = window.innerWidth+1;
        setTimeout(function() {
            canvas.height = window.innerHeight+1;
        }, 0);
    }

    /*** Downloads the data string as a file */
    static download(data, filename) {
        const blob = new Blob([data], {type: 'text/plain'});
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename || "LogicGateSimulator";
        elem.click();
    }

    static sqr(x) {
        return x * x;
    }

    static getGateAtPosition(x, y) {

        for (let gate of gates)
            if (Math.abs(x - gate.x) < gate.width / 2 && Math.abs(y - gate.y) < gate.height / 2)
                return gate;

        return null;
    }
}

/*** Removes elements from an array */
Array.prototype.remove = function(value) {
    return this.filter(function(e){
        return e !== value;
    });
};

/*** Removes a group of elements from an array */
Array.prototype.removeAll = function(values) {
    return this.filter(function(e){
        return !values.includes(e);
    });
};

// Forces the canvas to resize when the window is resized, and resizes it on start
window.onresize = Tools.resizeCanvas;
Tools.resizeCanvas();