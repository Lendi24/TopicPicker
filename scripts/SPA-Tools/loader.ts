class HtmlLoader {
    static loadPicker() {
        let htmlTopic  = document.getElementById("picked-topic");
        let htmlPeople = document.getElementById("picked-people");
        //let selectedPeople = new Array, selectedPeopleRender, shuffledArray;

        let selectedPeopleRender = "", selectedTopicsRender = "";
        //shuffledArray = shuffle(DataLoader.loadData("people"));

        let people = picker(
            DataLoader.loadData("people"),
            Config.GeneratorSettings.cooldownForPeople,
            Config.GeneratorSettings.nrOfOrganisers,
        );

        let topics = picker(
            DataLoader.loadData("topics"),
            Config.GeneratorSettings.cooldownForTopics, 1,
        );
    
        function picker(objectArray:Array<any>, cooldown:number, requestedCount:number) {
            let selectedObjects = [], shuffledArray = shuffle(objectArray);

            //Picks two random people, respecting cooldown. 
            for (let i = 0; i < shuffledArray.array.length; i++) { //Loops through a randomized array
                if (selectedObjects.length < requestedCount) { //If requested nrOfObjects are found, we continue. 
                    if ((shuffledArray.array[i]).timesSincePicked > cooldown) { //Checks if we can pick this element, based on last  time it was picked and cooldown settings
                        selectedObjects.push(i)
                    } else if (i== shuffledArray.array.length - (cooldown - selectedObjects.length)) { //If element cant be picked because of cooldown, and we are at the end of our list and have no other choises left, we just pick the last ones
                        console.warn("Error! Failed to respect cooldown. Picking randomly")
                        selectedObjects.push(i)
                    }
                } else { break; }
            }

            return ({
                selected : selectedObjects,
                shuffled : shuffledArray,    
            })
        }

        //Picks two random people, respecting cooldown. 
        /*
        for (let i = 0; i < shuffledArray.array.length; i++) { //Loops through a randomized array
            if (selectedPeople.length < Config.GeneratorSettings.nrOfOrganisers) { //If requested nrOfObjects are found, we continue. 
                if ((shuffledArray.array[i] as person).timesSincePicked > Config.GeneratorSettings.cooldownForPeople) { //Checks if we can pick this element, based on last  time it was picked and cooldown settings
                    selectedPeople.push(i)
                } else if (i== shuffledArray.array.length - (Config.GeneratorSettings.cooldownForPeople - selectedPeople.length)) { //If element cant be picked because of cooldown, and we are at the end of our list and have no other choises left, we just pick the last ones
                    console.warn("Error! Failed to respect cooldown. Picking randomly")
                    selectedPeople.push(i)
                }
            } else { break; }
        }*/

        //Updates meta-data and render for users
        for (let i = 0; i < people.shuffled.array.length; i++) { 
            if (people.selected.includes(i)) {
                selectedPeopleRender += `<li>
                    ${people.shuffled.array[i].firstName} 
                    ${people.shuffled.array[i].lastName}
                    #${people.shuffled.oldOrder[i]}
                    timesSincePicked:${people.shuffled.array[i].timesSincePicked}
                </li>`;
                (people.shuffled.array[i] as person).timesPicked++;
                (people.shuffled.array[i] as person).timesSincePicked = 0;

                DataLoader.editObject(
                    "people", 
                    people.shuffled.array[i],
                    people.shuffled.oldOrder[i]
                );    
            }  else {
                (people.shuffled.array[i] as person).timesSincePicked++;
                DataLoader.editObject(
                    "people", 
                    people.shuffled.array[i],
                    people.shuffled.oldOrder[i]
                );
    
            }
        }

        //Updates meta-data and render for topics
        for (let i = 0; i < topics.shuffled.array.length; i++) { 
            if (topics.selected.includes(i)) {
                selectedTopicsRender += `<li>
                    ${topics.shuffled.array[i].title} 
                    ${topics.shuffled.array[i].description}
                    #${topics.shuffled.oldOrder[i]}
                    timesSincePicked:${topics.shuffled.array[i].timesSincePicked}
                </li>`;
                (topics.shuffled.array[i] as topic).timesPicked++;
                (topics.shuffled.array[i] as topic).timesSincePicked = 0;

                DataLoader.editObject(
                    "topics", 
                    topics.shuffled.array[i],
                    topics.shuffled.oldOrder[i]
                );    
            }  else {
                (topics.shuffled.array[i] as topic).timesSincePicked++;
                DataLoader.editObject(
                    "topics", 
                    topics.shuffled.array[i],
                    topics.shuffled.oldOrder[i]
                );
            }
        }


        htmlPeople!.innerHTML = selectedPeopleRender;
        htmlTopic!.innerHTML = selectedTopicsRender;

        //--
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
                    <div class = "information">
                      <b>${(elem.firstName)}</b>
                      <b>${(elem.lastName)}</b><br>
                      <i>Times picked: ${(elem.timesPicked)}</i><br>
                      <i>Times since picked: ${(elem.timesSincePicked)}</i> 
                    </div><br>
                    <div class = "buttons list-actions">
                        <a href="#/editor/item--editType.person--editMode.1--editRef.${count}">
                            <span class="mdi mdi-pen">   
                        </a>
                        <a href="#/editor/" onclick="loadItemRemover(
                                let data = (DataLoader.loadData(people));
                                data.splice(${count}, 1)
                                DataLoader.saveData(people, data);
                            );">
                            <span class="mdi mdi-trash-can">   
                        </a>
                    </div>
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
                    <div class = "information">
                      <b>${(elem.title)}</b><br>
                      <p>${(elem.description)}</p><br>
                      <i>Times picked: ${(elem.timesPicked)}</i><br>
                      <i>Times since picked: ${(elem.timesSincePicked)}</i> 
                    </div><br>
                    <div class = "buttons list-actions">
                        <a href="#/editor/item--editType.topic--editMode.1--editRef.${count}">
                            <span class="mdi mdi-pen">   
                        </a>
                        <a href="#/editor/" onclick="loadItemRemover(
                                let data = (DataLoader.loadData(topics));
                                data.splice(${count}, 1)
                                DataLoader.saveData(topics, data);
                            );">
                            <span class="mdi mdi-trash-can">   
                        </a>
                    </div>
                </li>`;

                count++;
            });    

            return html;
        }

        if (lists.people) lists.people.innerHTML = updatePeople();
        if (lists.topics) lists.topics.innerHTML = updateTopics();
    }

    /*
    static loadItemRemover() {
        interface UrlArgsEditor{
            remConfirmed    : number;
            remType         : string;
            remRef          : number;
        }

        let urlArgs = (SpaRouter.getUrlArgs() as UrlArgsEditor)

        if (urlArgs.remConfirmed == 1) {
            let data = (DataLoader.loadData(urlArgs.remType));
            data.splice(urlArgs.remRef, 1)
            console.log(data);
            DataLoader.saveData(urlArgs.remType, data);
        } else {
            let html = 
                `<div>
                    Type: ${urlArgs.remType}
                    Objk: ${console.log(DataLoader.loadData(urlArgs.remType)[urlArgs.remRef])}
                </div>`;
            document.getElementById("confirm-text")!.innerHTML = html;
        }
    }*/

    static loadListEditor() {
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