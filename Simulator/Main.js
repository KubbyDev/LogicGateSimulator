//TODO:
/* serveur pour update auto des customgate
 * Index pour ouvrir tel ou tel fichier sur le serveur (index herberge sur le server)
 * Essayer de mettre en place le ouvrir avec
 * Possibilite de choisir entre fichiers heberges sur le server ou sur le git pages
 * Save -> POST sur le serveur qui met a jour toutes les gates. Erreurs: Circular dependencies, Changed number I/O
 * Get custom gates updates every X seconds */
// Cleanup (comments + robustesse + generalisation de code)
// manuel d'utilisation dans le readme

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