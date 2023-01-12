class HtmlLoader {
    static loadPicker() {
        
    }

    static loadLists() {
        
    }

    static loadListEditor() {
        interface UrlArgsEditor{
            editType : string;
            editMode : boolean;
            editRef  : number;
        }

        let urlArgs = (SpaRouter.getUrlArgs() as UrlArgsEditor)

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

                if (urlArgs.editMode == true) { // TODO: 'val == true' is bad. Fix this later by updating router to handle types
                    inputPrefill1 = "edit";
                    inputPrefill2 = "";
                    inputPrefill3 = "";
                }

                (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {DataLoader.}
                break;
                
            case "topic":
                inputLabel1 = "Title";
                inputLabel2 = "Description";
                inputLabel3 = "Image";

                if (urlArgs.editMode == true) {
                    inputPrefill1 = "edit";
                    inputPrefill2 = "";
                    inputPrefill3 = "";
                }

                (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {}
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
            (inputs[0].children[1] as HTMLInputElement).value = inputPrefill1;
            (inputs[1].children[1] as HTMLInputElement).value = inputPrefill2;
            (inputs[2].children[1] as HTMLInputElement).value = inputPrefill3;   
        }
    }
}

class DataLoader {
    static loadData(object:string, id:number) {
        
    }

    static saveData(object:string) {

    }
}