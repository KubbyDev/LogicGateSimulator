//TODO:
// snap auto sur la connection la plus proche
// serveur pour update auto des customgate
// Centrer gates au moemnt d'un load
// Supprimer les nodes dans les custom gates
/* Cleanup (comments + robustesse + generalisation de code)
 * const instead of let if possible
 * refaire le menu build en plus propre et general
 * passer les constantes dans des classes
 * gate drawing tools in GateFactory */
// Setup babel
// manuel d'utilisation dans le readme

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const popupBackground = document.getElementById("popup_bg");

let gates = []; // List of the gates in the simulation world
let framesToCalculate = -1; // -1: calculate frames without stopping, 0+: calculate x frames and stop

setTimeout(() => {

    Interface.init();

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

}, 10);