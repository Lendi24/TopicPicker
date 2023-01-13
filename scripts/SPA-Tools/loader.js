"use strict";
class HtmlLoader {
    static loadPicker() {
        let htmlTopic = document.getElementById("picked-topic");
        let htmlPeople = document.getElementById("picked-people");
        let selectedPeople, continueLoop;
        do {
            continueLoop = false;
            selectedPeople = (shuffle(DataLoader.loadData("people"))).slice(0, Config.GeneratorSettings.nrOfOrganisers);
            for (let i = 0; i < selectedPeople.length; i++) {
                if (selectedPeople[i].timesSincePicked > Config.GeneratorSettings.cooldownForPeople) { //cooldown
                    continueLoop = true;
                    break;
                }
            }
        } while (continueLoop);
        console.log(selectedPeople);
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }
            return array;
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
            let topics = DataLoader.loadData("topics");
            if (!topics) {
                return "No topics";
            } //Exits function if data is null
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
