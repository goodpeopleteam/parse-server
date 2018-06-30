module.exports = class Project {
    constructor(args = {}) {
        this.id = args.id;
        this.title = args.title;
        this.description = args.description;
        this.requiredTalents = args.requiredTalents;
        this.user = {
            id: args.user.id,
            firstName: args.user.get('firstName'),
            lastName: args.user.get('lastName'),
            location: args.user.get('location')
        };
    }

    static mapFromParse(parseProject, parseUser) {
        const id = parseProject.id;
        const title = parseProject.get('title');
        const description = parseProject.get('description');
        const requiredTalents = parseProject.get('requiredTalents');
        const user = parseUser;

        return new Project({
            id,
            title,
            description,
            requiredTalents,
            user
        });
    }
};