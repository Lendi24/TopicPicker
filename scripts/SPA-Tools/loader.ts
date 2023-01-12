class HtmlLoader {
    static loadPicker() {
        
    }

    static loadLists() {

        let lists = {
            people  : document.getElementById("peopleList"),
            topics  : document.getElementById("topicList"),
        }

        function updatePeople() {
            let html = "";
            let people = (DataLoader.loadData("people") as person[]);
            if (!people) { return "No Users" } //Exits function if data is null
            people.forEach(elem => {
                html += `<li>${(elem.firstName)}</li>`;
            });    
            return html;
        }

        function updateTopics() {
            let html = "";
            let topics = (DataLoader.loadData("topics") as topic[]);
            if (!topics) { return "No topics" } //Exits function if data is null
            topics.forEach(elem => {
                html += `<li>${(elem.title)}</li>`;
            });    
            return html;
        }

        if (lists.people) lists.people.innerHTML = updatePeople();
        if (lists.topics) lists.topics.innerHTML = updateTopics();
    }

    static loadListEditor() {
        interface UrlArgsEditor{
            editType : string;
            editMode : boolean;
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

                if (urlArgs.editMode == true) { // TODO: 'val == true' is bad. Fix this later by updating router to handle types
                    inputPrefill1 = "edit";
                    inputPrefill2 = "";
                    inputPrefill3 = "";
                }

                //Creates logic for save button
                (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {
                    if (inputs) {
                        DataLoader.addPerson(new person(
                            (inputs[0].children[1] as HTMLInputElement).value,
                            (inputs[1].children[1] as HTMLInputElement).value,
                            (inputs[2].children[1] as HTMLInputElement).value,
                        ));
                    }
                }

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

                //Creates logic for save button
                (document.getElementById("done-button") as HTMLLinkElement).onclick = () => {
                    if (inputs) {
                        DataLoader.addTopic(new topic(
                            (inputs[0].children[1] as HTMLInputElement).value,
                            (inputs[1].children[1] as HTMLInputElement).value,
                            (inputs[2].children[1] as HTMLInputElement).value,
                        ));
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
}

class DataLoader {
    static addPerson(person:person) {
        let people = (DataLoader.loadData("people") as person[])
        if (!people) { people = []}
        people.push(person)
        this.saveData("people", people)
    }

    static addTopic(topic:topic) {
        let topics = (DataLoader.loadData("topics") as topic[])
        if (!topics) { topics = []}
        topics.push(topic)
        this.saveData("topics", topics)
    }

    static saveData  (key:string, object:any) {localStorage.setItem(key, JSON.stringify(object));}
    static loadData  (key:string)             {return JSON.parse( (localStorage.getItem(key) as string) );}
    static removeData(key:string)             {localStorage.removeItem(key)}
}