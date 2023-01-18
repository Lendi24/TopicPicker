class HtmlLoader {
    static loadPicker()     {PagePicker.load()}
    static loadLists()      { PageLists.load()}
    static loadListEditor() {PageEditor.load()}
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

    static removeObject(key : string, id : number) {
        let data = (DataLoader.loadData(key));
        if (data.length <= 1) {
            DataLoader.removeData(key);
        } else {
            data.splice(id, 1)
            DataLoader.saveData(key, data);    
        }
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