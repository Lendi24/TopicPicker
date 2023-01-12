class person {
    firstName:string
    lastName:string
    pictire:string

    timesPicked:number
    timesSincePicked:number

    constructor(firstName:string, lastName:string, picture:string) {
        this.timesPicked = 0;
        this.timesSincePicked = 0;

        this.firstName = firstName;
        this.lastName  = lastName;

        this.pictire = picture;
    }
}

class topic {
    title:string
    description:string
    pictire:string

    timesPicked:number
    timesSincePicked:number

    constructor(title:string, description:string, picture:string) {
        this.timesPicked = 0;
        this.timesSincePicked = 0;

        this.title = title;
        this.description  = description;

        this.pictire = picture;
    }
}

