// TODO:
// Deplacement en groupe
// Creation de circuit a partir d'une equation
// Rendre l'utilisation possible sur mobile
// Deplacement sans zoom

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const popupBackground = document.getElementById("popup_bg");

let gates = []; // List of the gates in the simulation world
let framesToCalculate = -1; // -1: calculate frames without stopping, 0+: calculate x frames and stop

setTimeout(() => {

    Interface.init();

    // Physics updates: Every 10 ms tries to do 10 updates (cant do setInterval 1 because browser limits to 10)
    // If it can do more: waits, if time is up: stops (does less than 10 updates)
    setInterval(() => {
        let startTime = Date.now(); // milliseconds
        let nbCalculated = 0;
        while(nbCalculated < 10 && Date.now() - startTime < 10) {
            if (rightArrowPressed && framesToCalculate >= 0)
                framesToCalculate = Math.max(framesToCalculate, 1);
            if (framesToCalculate !== 0)
                Gate.updateAll(gates);
            if (framesToCalculate > 0)
                framesToCalculate--;
            nbCalculated++;
        }
    }, 10);

    // Graphics updates: Every 50 ms (20 fps)
    setInterval(() => {
        Interface.clear();
        Interface.update();
        Gate.drawAll(gates);
        Interface.draw();
    }, 50);

}, 100);