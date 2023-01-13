class HtmlLoader {
    static loadPicker() {
        let htmlTopic  = document.getElementById("picked-topic");
        let htmlPeople = document.getElementById("picked-people");
        let selectedPeople, selectedPeopleRender, continueLoop, shuffledArray;

        do { 
            continueLoop = false;
            selectedPeopleRender = "";
            shuffledArray = shuffle(DataLoader.loadData("people"));
            selectedPeople = ( shuffledArray.array ).slice(0,Config.GeneratorSettings.nrOfOrganisers);
            for (let i = 0; i < selectedPeople.length; i++) { 
                selectedPeopleRender += `<li>${selectedPeople[i].firstName}</li>`
                if ((selectedPeople[i] as person).timesSincePicked > Config.GeneratorSettings.cooldownForPeople) { 
                    continueLoop = true;
                    break;
                }
            }
        } while (continueLoop);

        //htmlPeople?.innerHTML = selectedPeopleRender;

        console.log(selectedPeople);
        console.log(shuffledArray.oldOrder)

        function shuffle(array:Array<any>) {
            let oldOrder = new Array, randomIndex, currentIndex = array.length;
            for (let i = 0; i < array.length; i++) { oldOrder[i] = i}
            while (currentIndex != 0) {
              randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--;
              [array[currentIndex],    array[randomIndex]]     = [array[randomIndex],    array[currentIndex]];
              [oldOrder[currentIndex], oldOrder[randomIndex]]  = [oldOrder[randomIndex], oldOrder[currentIndex]]
            } return {array:array, oldOrder:oldOrder};
        }
          
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

            let count = 0;
            people.forEach(elem => {
                html += 
                `<li>
                    <b>${(elem.firstName)}<b>
                    <a href="#/editor/item--editType.person--editMode.1--editRef.${count}">
                        Edit
                    </a>
                </li>`;
                count++;
            });    
            return html;
        }

        function updateTopics() {
            let html = "";
            let topics = (DataLoader.loadData("topics") as topic[]);
            if (!topics) { return "No topics" } //Exits function if data is null
            
            let count = 0;
            topics.forEach(elem => {
                html += 
                `<li>
                    <b>${(elem.title)}<b>
                    <a href="#/editor/item--editType.topic--editMode.1--editRef.${count}">
                        Edit
                    </a>
                </li>`;
                count++;
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

                if (urlArgs.editMode == true) {
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

    static editObject(key : string, object:object, id:number) {
        let people = (DataLoader.loadData(key) as object[])
        people[id] = object;
        this.saveData(key, people)
    }

    static saveData  (key:string, object:any) {localStorage.setItem(key, JSON.stringify(object));}
    static loadData  (key:string)             {return JSON.parse( (localStorage.getItem(key) as string) );}
    static removeData(key:string)             {localStorage.removeItem(key)}
}