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
    // Returns an array with the created fields, and the title in first position if one was given
    // fields must be of this form:
    // [
    //     {id: fieldId, defaultValue: defaultValue},
    //     {id: fieldId},
    //     ...
    // ]
    static addFields(fields, title) {

        // The parent element of the field. Changes to the title element if a title is given
        let fieldsContainer = Popup.containerDiv;
        let elements = [];

        // Creates the title and adds it to the popup
        if(title) {
            let text = document.createElement("P");
            text.innerHTML = title + " ";
            text.classList.add("popupElementTitle");
            Popup.containerDiv.appendChild(text);
            fieldsContainer = text;
            elements.push(text);
        }

        // Creates the fields and adds them as child of the title
        for(let field of fields) {

            let input = document.createElement("INPUT");
            if(field.id) input.id = field.id;
            input.value = field.defaultValue || "";
            input.classList.add("popupInput");

            fieldsContainer.appendChild(input);

            elements.push(input);
        }

        return elements;
    }

    // Adds a button group to the popup. Title is the text displayed on top on the button group (not mandatory).
    // Returns an array with the created buttons, and the title in first position if one was given
    // buttons must be of this form:
    // [
    //     {clickEvent: buttonClickEvent, title: buttonTitle},
    //     {clickEvent: buttonClickEvent},
    //     ...
    // ]
    static addButtons(buttons, title) {

        // The parent element of the field. Changes to the title element if a title is given
        let buttonsContainer = Popup.containerDiv;
        let elements = [];

        // Creates the title and adds it to the popup
        if(title) {
            let text = document.createElement("P");
            text.innerHTML = title;
            text.classList.add("popupElementTitle");
            Popup.containerDiv.appendChild(text);
            buttonsContainer = text;
            elements.push(text);
        }

        // Creates the fields and adds them as child of the title
        for(let button of buttons) {

            let b = document.createElement("BUTTON");
            b.innerHTML = button.title;
            b.addEventListener('click', button.clickEvent);
            b.classList.add("popupButton");

            buttonsContainer.appendChild(b);

            elements.push(b);
        }

        return elements;
    }

    // Adds a Done button with given event and returns it
    static addDoneButton(clickEvent) {
        let b = document.createElement("BUTTON");
        b.innerHTML = "Done";
        b.addEventListener('click', clickEvent ? clickEvent : Popup.close);
        b.classList.add("popupDoneButton");
        Popup.containerDiv.appendChild(b);
        return b;
    }

    // Adds a title with given text to the popup and returns it
    static addTitle(text) {
        let title = document.createElement("HR");
        title.innerHTML = text;
        title.classList.add("popupTitle");
        Popup.containerDiv.appendChild(title);
        return title;
    }

    // Adds a given amount of empty lines on the popup and returns them
    static addSpace(size) {

        if (size === undefined)
            size = 1;

        let elements = [];
        for (let i = 0; i < size; i++)
            elements.push(Popup.addText("<br>"));
        return elements;
    }

    // Adds a text to the popup and returns it
    static addText(text) {
        let t = document.createElement("P");
        t.innerHTML = text;
        t.classList.add("popupText");
        Popup.containerDiv.appendChild(t);
        return t;
    }

    // Opens an error message popup
    static openError(message) {
        Popup.open();
        Popup.addTitle("Error");
        Popup.addSpace();
        Popup.addText(message);
        Popup.addDoneButton();
    }
}