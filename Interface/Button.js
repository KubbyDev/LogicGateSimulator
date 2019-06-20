class Button {

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

    x = 0;
    y = 0;
    width = 80;
    height = 50;
    name = "";
    color = "#000000";
    fontSize = 14;

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
        ctx.fillStyle = Interface.BACKGROUND_COLOR;
        ctx.fillRect(
            this.x - this.width/2 + this.width/15,
            this.y - this.height/2 + this.height/15,
            this.width - 2*this.width/15,
            this.height - 2*this.height/15
        );

        //Nom
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = this.fontSize + "px Arial";
        ctx.fillText(this.name, this.x, this.y);
    }
}