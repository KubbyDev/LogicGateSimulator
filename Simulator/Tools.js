/*** Draws a full white circle */
function fillCircle(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(x, y, CIRCLE_RADIUS, 0, 2*Math.PI);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}
let CIRCLE_RADIUS = 5;

/*** Removes elements from an array */
Array.prototype.remove = function(value) {
    return this.filter(function(e){
        return e !== value;
    });
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
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}