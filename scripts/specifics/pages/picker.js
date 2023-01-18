"use strict";
class PagePicker {
    static picker(objectArray, cooldown, requestedCount) {
        let selectedObjects = [], shuffledArray = this.shuffle(objectArray);
        //Picks two random people, respecting cooldown. 
        for (let i = 0; i < shuffledArray.array.length; i++) { //Loops through a randomized array
            if (selectedObjects.length < requestedCount) { //If requested nrOfObjects are found, we continue. 
                if ((shuffledArray.array[i]).timesSincePicked > cooldown) { //Checks if we can pick this element, based on last  time it was picked and cooldown settings
                    selectedObjects.push(i);
                }
                else if (i == shuffledArray.array.length - (cooldown - selectedObjects.length)) { //If element cant be picked because of cooldown, and we are at the end of our list and have no other choises left, we just pick the last ones
                    console.warn("Error! Failed to respect cooldown. Picking randomly");
                    selectedObjects.push(i);
                }
            }
            else {
                break;
            }
        }
        return ({
            selected: selectedObjects,
            shuffled: shuffledArray,
        });
    }
    static shuffle(array) {
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
    static load() {
        let htmlTopic = document.getElementById("picked-topic");
        let htmlPeople = document.getElementById("picked-people");
        //let selectedPeople = new Array, selectedPeopleRender, shuffledArray;
        let selectedPeopleRender = "", selectedTopicsRender = "";
        //shuffledArray = shuffle(DataLoader.loadData("people"));
        let people = this.picker(DataLoader.loadData("people"), Config.GeneratorSettings.cooldownForPeople, Config.GeneratorSettings.nrOfOrganisers);
        let topics = this.picker(DataLoader.loadData("topics"), Config.GeneratorSettings.cooldownForTopics, 1);
        //Updates meta-data and render for users
        for (let i = 0; i < people.shuffled.array.length; i++) {
            if (people.selected.includes(i)) {
                selectedPeopleRender += `<li>
                    ${people.shuffled.array[i].firstName} 
                    ${people.shuffled.array[i].lastName}
                    #${people.shuffled.oldOrder[i]}
                    timesSincePicked:${people.shuffled.array[i].timesSincePicked}
                </li>`;
                people.shuffled.array[i].timesPicked++;
                people.shuffled.array[i].timesSincePicked = 0;
                DataLoader.editObject("people", people.shuffled.array[i], people.shuffled.oldOrder[i]);
            }
            else {
                people.shuffled.array[i].timesSincePicked++;
                DataLoader.editObject("people", people.shuffled.array[i], people.shuffled.oldOrder[i]);
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
                topics.shuffled.array[i].timesPicked++;
                topics.shuffled.array[i].timesSincePicked = 0;
                DataLoader.editObject("topics", topics.shuffled.array[i], topics.shuffled.oldOrder[i]);
            }
            else {
                topics.shuffled.array[i].timesSincePicked++;
                DataLoader.editObject("topics", topics.shuffled.array[i], topics.shuffled.oldOrder[i]);
            }
        }
        htmlPeople.innerHTML = selectedPeopleRender;
        htmlTopic.innerHTML = selectedTopicsRender;
    }
    static unload() {
    }
}
