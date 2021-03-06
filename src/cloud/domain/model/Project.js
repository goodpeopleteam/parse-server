const User = require('./User');
const Talent = require("./Talent");

function getRequiredTalents(project) {
    if (project.get('requiredTalents')) {
        return project.get('requiredTalents')
            .filter(x => !!x.get('name'))
            .map(Talent.map);
    }

    if (project.get('skillsNeeded'))
        return project.get('skillsNeeded').map(s => {
            return { name: s }
        });

    return [];
}

function getProfilePictureUrl(profile, profilePicture) {
    if (profile) {
        return User.getProfilePictureUrl(profile);
    }

    if (!profilePicture)
        return "";

    return profilePicture.url();
}

const mapFromParseV1 = (project, loggedUser) => {
    const id = project.id;
    const views = project.get('views');
    const title = project.get('title');
    const description = project.get('description');
    const requiredTalents = getRequiredTalents(project);

    const profile = project.get('user');

    let profilePicture = project.get('userImageProfile');
    const profilePictureUrl = getProfilePictureUrl(profile, profilePicture);

    let profileMapping;
    let isOwnProject;

    if (!profile) {
        const userID = project.get('userID');
        isOwnProject = userID === loggedUser.id;

        profileMapping = {
            id: userID,
            fullName: project.get('userName'),
            location: {},
            profilePictureUrl: profilePictureUrl
        };
    } else {
        isOwnProject = profile.id === loggedUser.id;
        profileMapping = User.mapFromParse(loggedUser, profile);
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
