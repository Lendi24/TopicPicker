"use strict";
class HtmlLoader {
    static loadPicker() { PagePicker.load(); }
    static loadLists() { PageLists.load(); }
    static loadListEditor() { PageEditor.load(); }
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
    static removeObject(key, id) {
        let data = (DataLoader.loadData(key));
        if (data.length <= 1) {
            DataLoader.removeData(key);
        }
        else {
            data.splice(id, 1);
            DataLoader.saveData(key, data);
        }
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
