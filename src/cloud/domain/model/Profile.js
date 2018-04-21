const fetch = require('node-fetch');

module.exports = class Profile {
    constructor(args = {}) {
        this.id = args.id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
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
            about: x.get('about'),
            country: x.get('country'),
            city: x.get('city'),
            skills: x.get('skills'),
            location: x.get('location'),
        });
    }

    static getFacebookPicture(facebookId) {
        return fetch(this.getFacebookPictureUrl(facebookId))
            .then(res => res.buffer())
            .then(buffer => Buffer.from(buffer).toString('base64'))
            .catch(e => {
                console.log(e)
            });
    }

    static getFacebookPictureUrl(facebookId) {
        return `https://graph.facebook.com/${facebookId}/picture?type=large`;
    }

    static getCustomPicture(profile) {
        const file = profile.get('profilePicture');
        if (!file)
            return "";

        return Parse.Cloud.httpRequest({ url: file.url() })
            .then(response => Buffer.from(response.buffer).toString('base64'));
    }
};