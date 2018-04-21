export default class Profile {
    constructor(args = {}) {
        this.id = args.id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.profilePictureUrl = args.profilePictureUrl;
        this.about = args.about;
        this.skills = args.skills;
        this.location = {
            country: args.country,
            city: args.city,
            location: args.location
        }
    }

    static mapFromParse(x) {
        return new Profile({
            id: x.id,
            firstName: x.get('firstName'),
            lastName: x.get('lastName'),
            profilePictureUrl: this.getProfilePictureUrl(x.get('facebookId')),
            about: x.get('about'),
            country: x.get('country'),
            city: x.get('city'),
            skills: x.get('skills'),
            location: x.get('location')
        });
    }

    static getProfilePictureUrl(facebookId) {
        return `http://graph.facebook.com/${facebookId}/picture?type=large`;
    }
}