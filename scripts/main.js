"use strict";
class person {
    constructor(id, firstName, lastName, picture) {
        this.id = id;
        this.timesPicked = 0;
        this.timesSincePicked = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pictire = picture;
    }
}
class topic {
    constructor(id, title, description, picture) {
        this.id = id;
        this.timesPicked = 0;
        this.timesSincePicked = 0;
        this.title = title;
        this.description = description;
        this.pictire = picture;
    }
}
