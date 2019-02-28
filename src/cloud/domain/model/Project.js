const User = require('./User');
const Talent = require("./Talent");

function getProfilePictureUrl(profile, profilePicture) {
    if (profile) {
        return User.getProfilePictureUrl(profile);
    }

    if (!profilePicture)
        return "";
    const url = profilePicture.url();
    return url;
}

const mapFromParseV1 = (project, activeUser) => {
    const id = project.id;
    const title = project.get('title');
    const description = project.get('description');
    const requiredTalents = project.get('requiredTalents') !== undefined ? project.get('requiredTalents').map(Talent.map) : [];

    const profile = project.get('user');
    let profilePicture = project.get('userImageProfile');

    const profilePictureUrl = getProfilePictureUrl(profile, profilePicture);

    if (!profile) {
        const userID = project.get('userID');
        return {
            id,
            isOwnProject: userID === activeUser.id,
            title,
            description,
            requiredTalents,
            profile: {
                id: userID,
                fullName: project.get('userName'),
                location: {},
                profilePictureUrl: profilePictureUrl
            }
        };
    }

    return {
        id,
        isOwnProject: profile.id === activeUser.id,
        title,
        description,
        requiredTalents,
        profile: User.mapFromParse(profile)
    };
};

module.exports = {
    mapFromParseV1
};