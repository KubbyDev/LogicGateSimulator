/***
 * Dessine un cercle blanc plein
 */
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

//Outil pour supprimer des elements d'une array
Array.prototype.remove = function(value) {
    return this.filter(function(e){
        return e !== value;
    });
};

//Garde toujours le canvas en pleine page
function resizeCanvas() {
    canvas.width = window.innerWidth+1;
    setTimeout(function() {
        canvas.height = window.innerHeight+1;
    }, 0);
}
window.onresize = resizeCanvas;
resizeCanvas();

function closePopup(popup) {

}