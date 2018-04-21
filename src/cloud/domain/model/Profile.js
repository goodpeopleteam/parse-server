export default class Profile {
    constructor(args = {}) {
        this.id = args.id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
    }

    static mapFromParse(x) {
        const id = x.id;
        const firstName = x.get('firstName');
        const lastName = x.get('lastName');

        return new Profile({
            id,
            firstName,
            lastName
        });
    }
}