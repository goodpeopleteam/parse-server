module.exports = class Profile {
    static mapFromParse(x) {
        return {
            id: x.id,
            firstName: x.get('firstName'),
            lastName: x.get('lastName'),
            about: x.get('about'),
            skills: x.get('skills') || [],
            profilePictureUrl: this.getProfilePictureUrl(x),
            location: {
                location: x.get('location'),
                country: x.get('country') || undefined,
                city: x.get('city') || undefined,
            }
        };
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