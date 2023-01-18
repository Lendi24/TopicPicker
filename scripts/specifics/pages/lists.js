"use strict";
class PageLists {
    static updatePeople() {
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
                    <a href="#/editor/" onclick="DataLoader.removeObject('people',${count})">
                        <span class="mdi mdi-trash-can">   
                    </a>
                </div>
            </li>`;
            count++;
        });
        return html;
    }
    static updateTopics() {
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
                  <p>${(elem.description)}</p><br>
                  <i>Times picked: ${(elem.timesPicked)}</i><br>
                  <i>Times since picked: ${(elem.timesSincePicked)}</i> 
                </div><br>
                <div class = "buttons list-actions">
                    <a href="#/editor/item--editType.topic--editMode.1--editRef.${count}">
                        <span class="mdi mdi-pen">   
                    </a>
                    <a href="#/editor/" onclick="DataLoader.removeObject('topics',${count})">
                        <span class="mdi mdi-trash-can">   
                    </a>
                </div>
            </li>`;
            count++;
        });
        return html;
    }
    static load() {
        let lists = {
            people: document.getElementById("peopleList"),
            topics: document.getElementById("topicList"),
        };
        if (lists.people)
            lists.people.innerHTML = this.updatePeople();
        if (lists.topics)
            lists.topics.innerHTML = this.updateTopics();
    }
    static unload() {
    }
}
