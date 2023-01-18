class PageEditor {
    static load() {
        interface UrlArgsEditor{
            editType : string;
            editMode : number;
            editRef  : number;
        }

        let urlArgs = (SpaRouter.getUrlArgs() as UrlArgsEditor)
        let inputs = document.getElementById("inputs")?.children

        let inputLabel1 = "Error!";
        let inputLabel2 = "Error!";
        let inputLabel3 = "Error!";
        
        let inputPrefill1 = "";
        let inputPrefill2 = "";
        let inputPrefill3 = "";

        switch (urlArgs.editType) {
            case "person":
                inputLabel1 = "First Name";
                inputLabel2 = "Last Name";
                inputLabel3 = "Image";    

                if (urlArgs.editMode == 1) { // TODO: 'val == true' is bad. Fix this later by updating router to handle types
                    let data = DataLoader.loadData("people")[urlArgs.editRef]
                    inputPrefill1 = data.firstName;
                    inputPrefill2 = data.lastName;
                    inputPrefill3 = data.pictire;

                    //Creates logic for save button for editing
                    (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {
                        if (inputs) {
                            DataLoader.editObject("people", new person (
                                (inputs[0].children[1] as HTMLInputElement).value,
                                (inputs[1].children[1] as HTMLInputElement).value,
                                (inputs[2].children[1] as HTMLInputElement).value,
                            ), urlArgs.editRef);    
                        }
                    }

                } else {
                    //Creates logic for save button for adding
                    (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {
                        if (inputs) {
                            DataLoader.addPerson(new person (
                                (inputs[0].children[1] as HTMLInputElement).value,
                                (inputs[1].children[1] as HTMLInputElement).value,
                                (inputs[2].children[1] as HTMLInputElement).value,
                            ));
                        }
                    }
                }


                break;
                
            case "topic":
                inputLabel1 = "Title";
                inputLabel2 = "Description";
                inputLabel3 = "Image";

                if (urlArgs.editMode == 1) {
                    let data = DataLoader.loadData("topics")[urlArgs.editRef]
                    inputPrefill1 = data.title;
                    inputPrefill2 = data.description;
                    inputPrefill3 = data.pictire;

                    //Creates logic for save button for editing
                    (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {
                        if (inputs) {
                            DataLoader.editObject("topics", new topic (
                                (inputs[0].children[1] as HTMLInputElement).value,
                                (inputs[1].children[1] as HTMLInputElement).value,
                                (inputs[2].children[1] as HTMLInputElement).value,
                            ), urlArgs.editRef);    
                        }
                    }

                } else {
                    //Creates logic for save button for adding
                    (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {
                        if (inputs) {
                            DataLoader.addTopic(new topic(
                                (inputs[0].children[1] as HTMLInputElement).value,
                                (inputs[1].children[1] as HTMLInputElement).value,
                                (inputs[2].children[1] as HTMLInputElement).value,
                            ));
                        }
                    }
                }

                break;
    
            default:
                break;
        }
    
        if (inputs) {
            //Updates labels 
            inputs[0].children[0].innerHTML = inputLabel1;
            inputs[1].children[0].innerHTML = inputLabel2;
            inputs[2].children[0].innerHTML = inputLabel3;
    
            //Updates inputs
            (inputs[0].children[1] as HTMLInputElement).value = inputPrefill1;
            (inputs[1].children[1] as HTMLInputElement).value = inputPrefill2;
            (inputs[2].children[1] as HTMLInputElement).value = inputPrefill3;   
        }
    }

    static unload() {
        
    }
}