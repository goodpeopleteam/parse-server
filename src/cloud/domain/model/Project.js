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
    const views = project.get('views');
    const title = project.get('title');
    const description = project.get('description');
    const requiredTalents = project.get('requiredTalents') !== undefined ? project.get('requiredTalents').map(Talent.map) : [];

    const profile = project.get('user');

    let profilePicture = project.get('userImageProfile');
    const profilePictureUrl = getProfilePictureUrl(profile, profilePicture);

    let profileMapping;
    let isOwnProject;

    if (!profile) {
        const userID = project.get('userID');
        isOwnProject = userID === activeUser.id;

        profileMapping = {
            id: userID,
            fullName: project.get('userName'),
            location: {},
            profilePictureUrl: profilePictureUrl
        };
    } else {
        isOwnProject = profile.id === activeUser.id;
        profileMapping = User.mapFromParse(profile);
    }

    return {
        id,
        isOwnProject: isOwnProject,
        views,
        title,
        description,
        requiredTalents,
        profile: profileMapping
    };
};

module.exports = {
    mapFromParseV1
};