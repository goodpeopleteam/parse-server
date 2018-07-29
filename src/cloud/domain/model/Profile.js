module.exports = class Profile {
    constructor(args = {}) {
        this.id = args.id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.about = args.about;
        this.skills = args.skills;
        this.profilePictureUrl = args.profilePictureUrl;
        this.location = {};

        this.location.country = args.country || undefined;
        this.location.city = args.city || undefined;
        this.location.location = args.location;
    }

    static mapFromParse(x) {
        return new Profile({
            id: x.id,
            firstName: x.get('firstName'),
            lastName: x.get('lastName'),
            about: x.get('about'),
            country: x.get('country'),
            city: x.get('city'),
            skills: x.get('skills'),
            profilePictureUrl: this.getProfilePictureUrl(x),
            location: x.get('location'),
        });
    }

    static getProfilePictureUrl(parseProfile) {
        const facebookId = parseProfile.get('facebookId');
        if (facebookId)
            return this.getFacebookPictureUrl(facebookId);
        else {
            const profilePicture = parseProfile.get('profilePicture');
            if (!profilePicture)
                return '';

            return profilePicture.url();
        }
    }

    static getFacebookPictureUrl(facebookId) {
        return `https://graph.facebook.com/${facebookId}/picture?type=large`;
    }
};