
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const popupBackground = document.getElementById("popup_bg");

let gates = []; // List of the gates in the simulation world
let framesToCalculate = -1; // -1: calculate frames without stopping, 0+: calculate x frames and stop

setTimeout(() => {

    Interface.init();

    // Main program loop
    setInterval(() => {

        Interface.clear();
        Interface.update();

        if(framesToCalculate !== 0)
            Gate.updateAll(gates);
        if(framesToCalculate > 0)
            framesToCalculate--;

        Gate.drawAll(gates);
        Interface.draw();

    }, 1);

}, 100);