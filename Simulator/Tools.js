/*** Draws a circle */
function fillCircle(x, y, radius, fillColor, drawBounds, boundsColor) {

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
let circleRadius = 5;

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

/*** Searches if the array contains values (compares references, not whole objects) */
Array.prototype.includesByReference = function(value) {
    for(let element of this) {
        if(element == value)
            return true;
    }
    return false;
};

/*** Forces the canvas to take the entire page */
function resizeCanvas() {
    canvas.width = window.innerWidth+1;
    setTimeout(function() {
        canvas.height = window.innerHeight+1;
    }, 0);
}
window.onresize = resizeCanvas;
resizeCanvas();

/*** Downloads the data string as a file */
function download(data, filename) {
    let blob = new Blob([data], {type: 'text/plain'});
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename || "LogicGateSimulator";
    elem.click();
}

function sqr(x) {
    return x*x;
}