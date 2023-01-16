"use strict";
class HtmlLoader {
    static loadPicker() {
        let htmlTopic = document.getElementById("picked-topic");
        let htmlPeople = document.getElementById("picked-people");
        let selectedPeople, selectedPeopleRender, continueLoop, shuffledArray;
        do { //Picking selected amount of orginisers and re-picking if selected people are on cooldown
            continueLoop = false; //TODO: Maybe dont redo the whole list if only on of selected is on cooldown?
            selectedPeopleRender = ""; //  How about having a list for cooldowned people and removing them from the main storage would make things better?
            shuffledArray = shuffle(DataLoader.loadData("people"));
            selectedPeople = (shuffledArray.array).slice(0, Config.GeneratorSettings.nrOfOrganisers);
            for (let i = 0; i < selectedPeople.length; i++) {
                selectedPeopleRender += `<li>
                                            ${selectedPeople[i].firstName} 
                                            ${selectedPeople[i].lastName}
                                            #${shuffledArray.oldOrder[i]}
                                        </li>`;
                if (selectedPeople[i].timesSincePicked > Config.GeneratorSettings.cooldownForPeople) {
                    continueLoop = true;
                    break;
                }
            }
        } while (continueLoop);
        //Updates meta-data for all
        for (let i = 0; i < shuffledArray.array.length; i++) {
            shuffledArray.array[i].timesSincePicked++;
            DataLoader.editObject("people", shuffledArray.array[i], shuffledArray.oldOrder[i]);
        }
        //Updates meta-data for selected
        for (let i = 0; i < selectedPeople.length; i++) {
            selectedPeople[i].timesPicked++;
            selectedPeople[i].timesSincePicked = 0;
            DataLoader.editObject("people", selectedPeople[i], shuffledArray.oldOrder[i]);
        } //TODO: There is a way more efficient way of doing this.. Loop through the array once, and edit just the [how many config says] ones as picked
        htmlPeople === null || htmlPeople === void 0 ? void 0 : htmlPeople.innerHTML = selectedPeopleRender;
        console.log(selectedPeople);
        console.log(shuffledArray.oldOrder);
        //--
        function shuffle(array) {
            let oldOrder = new Array, randomIndex, currentIndex = array.length;
            for (let i = 0; i < array.length; i++) {
                oldOrder[i] = i;
            }
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
                [oldOrder[currentIndex], oldOrder[randomIndex]] = [oldOrder[randomIndex], oldOrder[currentIndex]];
            }
            return { array: array, oldOrder: oldOrder };
        }
    }
    static loadLists() {
        let lists = {
            people: document.getElementById("peopleList"),
            topics: document.getElementById("topicList"),
        };
        function updatePeople() {
            let html = "";
            let people = DataLoader.loadData("people");
            if (!people) {
                return "No Users";
            } //Exits function if data is null
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
                        <a href="">
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
            let topics = DataLoader.loadData("topics");
            if (!topics) {
                return "No topics";
            } //Exits function if data is null
            let count = 0;
            topics.forEach(elem => {
                html +=
                    `<li>
                    <div class = "information">
                      <b>${(elem.title)}</b><br>
                      <i>${(elem.description)}</i><br>
                    </div><br>
                    <div class = "buttons list-actions">
                        <a href="#/editor/item--editType.person--editMode.1--editRef.${count}">
                            <span class="mdi mdi-pen">   
                        </a>
                        <a href="">
                            <span class="mdi mdi-trash-can">   
                        </a>
                    </div>
                </li>`;
                count++;
            });
            return html;
        }
        if (lists.people)
            lists.people.innerHTML = updatePeople();
        if (lists.topics)
            lists.topics.innerHTML = updateTopics();
    }
    static loadListEditor() {
        var _a;
        let urlArgs = SpaRouter.getUrlArgs();
        let inputs = (_a = document.getElementById("inputs")) === null || _a === void 0 ? void 0 : _a.children;
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
                    let data = DataLoader.loadData("people")[urlArgs.editRef];
                    inputPrefill1 = data.firstName;
                    inputPrefill2 = data.lastName;
                    inputPrefill3 = data.pictire;
                    //Creates logic for save button for editing
                    document.getElementById("done-button").onclick = () => {
                        if (inputs) {
                            DataLoader.editObject("people", new person(inputs[0].children[1].value, inputs[1].children[1].value, inputs[2].children[1].value), urlArgs.editRef);
                        }
                    };
                }
                else {
                    //Creates logic for save button for adding
                    document.getElementById("done-button").onclick = () => {
                        if (inputs) {
                            DataLoader.addPerson(new person(inputs[0].children[1].value, inputs[1].children[1].value, inputs[2].children[1].value));
                        }
                    };
                }
                break;
            case "topic":
                inputLabel1 = "Title";
                inputLabel2 = "Description";
                inputLabel3 = "Image";
                if (urlArgs.editMode == true) {
                    let data = DataLoader.loadData("topics")[urlArgs.editRef];
                    inputPrefill1 = data.title;
                    inputPrefill2 = data.description;
                    inputPrefill3 = data.pictire;
                    //Creates logic for save button for editing
                    document.getElementById("done-button").onclick = () => {
                        if (inputs) {
                            DataLoader.editObject("topics", new topic(inputs[0].children[1].value, inputs[1].children[1].value, inputs[2].children[1].value), urlArgs.editRef);
                        }
                    };
                }
                else {
                    //Creates logic for save button for adding
                    document.getElementById("done-button").onclick = () => {
                        if (inputs) {
                            DataLoader.addTopic(new topic(inputs[0].children[1].value, inputs[1].children[1].value, inputs[2].children[1].value));
                        }
                    };
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
            inputs[0].children[1].value = inputPrefill1;
            inputs[1].children[1].value = inputPrefill2;
            inputs[2].children[1].value = inputPrefill3;
        }
    }
}
class DataLoader {
    static addPerson(person) {
        let people = DataLoader.loadData("people");
        if (!people) {
            people = [];
        }
        people.push(person);
        this.saveData("people", people);
    }
    static addTopic(topic) {
        let topics = DataLoader.loadData("topics");
        if (!topics) {
            topics = [];
        }
        topics.push(topic);
        this.saveData("topics", topics);
    }
    static editObject(key, object, id) {
        let people = DataLoader.loadData(key);
        people[id] = object;
        this.saveData(key, people);
    }
    static saveData(key, object) { localStorage.setItem(key, JSON.stringify(object)); }
    static loadData(key) { return JSON.parse(localStorage.getItem(key)); }
    static removeData(key) { localStorage.removeItem(key); }
}
