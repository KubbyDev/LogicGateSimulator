class Button {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 80;
        this.height = 50;
        this.name = "";
        this.color = "#000000";
        this.fontSize = 14;
    }

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    /***
     * Modifie le code a executer quand on clique sur le bouton
     * @param onClick
     */
    setOnClick(onClick) {
        this.onClick = onClick;
        return this;
    }

    onClick() {
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

    setGraphicProperties(width, height, name,color) {

        this.width = width;
        this.height = height;
        this.name = name;
        this.color = color;
        return this;
    }

    /***
     * Dessine le bouton
     */
    draw() {

        //Contours
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);

        //Millieu
        ctx.fillStyle = interfaceBackgroundColor;
        ctx.fillRect(
            this.x - this.width/2 + this.width/15,
            this.y - this.height/2 + this.height/15,
            this.width - 2*this.width/15,
            this.height - 2*this.height/15
        );

        this.drawCenter();
    }

    /***
     * Definit ce qui doit s'afficher dans le carre au centre du bouton
     */
    drawCenter() {
        this.drawName();
    }

    drawName() {

        //Nom
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = this.fontSize + "px Arial";
        ctx.fillText(this.name, this.x, this.y);
    }
}