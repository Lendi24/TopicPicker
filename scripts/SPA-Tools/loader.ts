class HtmlLoader {
    static loadPicker() {
        
    }

    static loadLists() {
        
    }

    static loadListEditor() {
        interface UrlArgsEditor{
            editMode : string;
        }

        let urlArgs = (SpaRouter.getUrlArgs() as UrlArgsEditor)

        let inputLabel1 = "Error!";
        let inputLabel2 = "Error!";
        let inputLabel3 = "Error!";

        switch (urlArgs.editMode) {
            case "person":
                inputLabel1 = "First Name";
                inputLabel2 = "Last Name";
                inputLabel3 = "Image";    
                break;
                
            case "topic":
                inputLabel1 = "Title";
                inputLabel2 = "Description";
                inputLabel3 = "Image";
                break;
    
            default:
                break;
        }
    
        let inputs = document.getElementById("inputs")?.children

        if (inputs) {
            //Updates labels 
            inputs[0].children[0].innerHTML = inputLabel1;
            inputs[1].children[0].innerHTML = inputLabel2;
            inputs[2].children[0].innerHTML = inputLabel3;
    
            //Updates inputs
            (inputs[0].children[1] as HTMLInputElement).value = "oi";
            (inputs[1].children[1] as HTMLInputElement).value = "oi";
            (inputs[2].children[1] as HTMLInputElement).value = "oi" ;   
        }
    }
}

class DataLoader {
    loadPeople() {

    }

    loadTopics() {
        
    }

    saveTopics() {

    }

    savePeople() {

    }
}