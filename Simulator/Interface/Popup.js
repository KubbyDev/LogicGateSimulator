class Popup {

    static mainDiv = document.getElementById("popup_main_div"); // The main popup div. Contains the containerDiv
    static containerDiv; // The div that contains all the elements

    static open() {

        Popup.containerDiv = document.createElement("DIV");
        Popup.mainDiv.appendChild(Popup.containerDiv);

        popupBackground.style.display = 'block';
        Interface.blockInputs = true;
    }

    static close() {

        Popup.containerDiv = undefined;

        let child = Popup.mainDiv.lastElementChild;
        while (child) {
            Popup.mainDiv.removeChild(child);
            child = Popup.mainDiv.lastElementChild;
        }

        popupBackground.style.display = 'none';
        Interface.blockInputs = false;
    }

    // Closes the popup if the user clicked on the background
    static closeIfClickedOnBackground() {

        // Does nothing if the user clicked on the popup
        if(mouseX > canvas.width*0.1 && mouseX < canvas.width*0.9
        && mouseY > canvas.height*0.1 && mouseY < canvas.height*0.9)
            return;

        // Closes the popup if the user clicked on the background
        Popup.close();
    }

    // Adds a field group to the popup. Title is the text displayed on top on the field group (not mandatory).
    // fields must be of this form:
    // [
    //     {id: fieldId, defaultValue: defaultValue},
    //     {id: fieldId},
    //     ...
    // ]
    static addFields(fields, title) {

        // The parent element of the field. Changes to the title element if a title is given
        let fieldsContainer = Popup.containerDiv;

        // Creates the title and adds it to the popup
        if(title) {
            let text = document.createElement("P");
            text.innerHTML = title + " ";
            text.classList.add("popupElementTitle");
            Popup.containerDiv.appendChild(text);
            fieldsContainer = text;
        }

        // Creates the fields and adds them as child of the title
        for(let field of fields) {

            let input = document.createElement("INPUT");
            if(field.id) input.id = field.id;
            input.value = field.defaultValue || "";
            input.classList.add("popupInput");

            fieldsContainer.appendChild(input);
        }
    }

    // Adds a button group to the popup. Title is the text displayed on top on the button group (not mandatory).
    // buttons must be of this form:
    // [
    //     {clickEvent: buttonClickEvent, title: buttonTitle},
    //     {clickEvent: buttonClickEvent},
    //     ...
    // ]
    static addButtons(buttons, title) {

        // The parent element of the field. Changes to the title element if a title is given
        let buttonsContainer = Popup.containerDiv;

        // Creates the title and adds it to the popup
        if(title) {
            let text = document.createElement("P");
            text.innerHTML = title;
            text.classList.add("popupElementTitle");
            Popup.containerDiv.appendChild(text);
            buttonsContainer = text;
        }

        // Creates the fields and adds them as child of the title
        for(let button of buttons) {

            let b = document.createElement("BUTTON");
            b.innerHTML = button.title;
            b.addEventListener('click', button.clickEvent);
            b.classList.add("popupButton");

            buttonsContainer.appendChild(b);
        }
    }

    static addDoneButton(clickEvent) {
        let b = document.createElement("BUTTON");
        b.innerHTML = "Done";
        b.addEventListener('click', clickEvent);
        b.classList.add("popupDoneButton");

        Popup.containerDiv.appendChild(b);
    }

    // Adds a title with given text to the popup
    static addTitle(text) {
        let separator = document.createElement("HR");
        separator.innerHTML = text;
        separator.classList.add("popupTitle");
        Popup.containerDiv.appendChild(separator);
    }

    // Adds a given amount of empty lines on the popup
    static addSpace(size) {

        if (size === undefined)
            size = 1;

        for (let i = 0; i < size; i++)
            Popup.addText("<br>");
    }

    // Adds a text to the popup
    static addText(text) {
        let t = document.createElement("P");
        t.innerHTML = text;
        t.classList.add("popupText");
        Popup.containerDiv.appendChild(t);
    }
}