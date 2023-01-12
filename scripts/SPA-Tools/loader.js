"use strict";
class HtmlLoader {
    static loadPicker() {
    }
    static loadLists() {
        var _a, _b;
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
            people.forEach(elem => {
                html += `<li>${(elem.firstName)}</li>`;
            });
            return html;
        }
        function updateTopics() {
            let html = "";
            let topics = DataLoader.loadData("topics");
            if (!topics) {
                return "No topics";
            } //Exits function if data is null
            topics.forEach(elem => {
                html += `<li>${(elem.title)}</li>`;
            });
            return html;
        }
        (_a = lists.people) === null || _a === void 0 ? void 0 : _a.innerHTML = updatePeople();
        (_b = lists.topics) === null || _b === void 0 ? void 0 : _b.innerHTML = updateTopics();
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
                    inputPrefill1 = "edit";
                    inputPrefill2 = "";
                    inputPrefill3 = "";
                }
                //Creates logic for save button
                document.getElementById("done-button").onclick = () => {
                    if (inputs) {
                        DataLoader.addPerson(new person(inputs[0].children[1].value, inputs[1].children[1].value, inputs[2].children[1].value));
                    }
                };
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
                document.getElementById("done-button").onclick = () => {
                    if (inputs) {
                        DataLoader.addTopic(new topic(inputs[0].children[1].value, inputs[1].children[1].value, inputs[2].children[1].value));
                    }
                };
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
    static saveData(key, object) { localStorage.setItem(key, JSON.stringify(object)); }
    static loadData(key) { return JSON.parse(localStorage.getItem(key)); }
    static removeData(key) { localStorage.removeItem(key); }
}
