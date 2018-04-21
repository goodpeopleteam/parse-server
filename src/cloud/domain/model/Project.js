module.exports = class Project {
    constructor(args = {}) {
        this.id = args.id;
        this.title = args.title;
        this.description = args.description;
        this.skillsNeeded = args.skillsNeeded;
    }

    static mapFromParse(x) {
        const id = x.id;
        const title = x.get('title');
        const description = x.get('description');
        const skillsNeeded = x.get('skillsNeeded');

        return new Project({
            id,
            title,
            description,
            skillsNeeded
        });
    }
};