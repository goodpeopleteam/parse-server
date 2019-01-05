const User = require('./User');

const mapFromParseV1 = (project) => {
    const id = project.id;
    const title = project.get('title');
    const description = project.get('description');
    const skillsNeeded = project.get('skillsNeeded') || [];

    const profile = project.get('user');
    let profilePicture = project.get('userImageProfile');

    if (!profile) {
        return {
            id,
            title,
            description,
            requiredTalents: skillsNeeded,
            profile: {
                id: project.get('userID'),
                fullName: project.get('userName'),
                location: project.get('userLocation'),
                profilePictureUrl: profilePicture ? profilePicture.url() : ""
            }
        };
    }

    return {
        id,
        title,
        description,
        requiredTalents: skillsNeeded,
        profile: {
            id: profile.id,
            fullName: `${profile.get('firstName')} ${profile.get('lastName')}`,
            location: profile.get('location'),
            profilePictureUrl: profilePicture ? profilePicture.url() : ""
        }
    };
};

const mapFromParse = (project, profile) => {
    const id = project.id;
    const title = project.get('title');
    const description = project.get('description');
    const skillsNeeded = project.get('skillsNeeded') || [];

    if (!profile) {
        return {
            id,
            title,
            description,
            requiredTalents: skillsNeeded
        };
    }

    return {
        id,
        title,
        description,
        requiredTalents: skillsNeeded,
        profile: {
            id: profile.id,
            firstName: profile.get('firstName'),
            lastName: profile.get('lastName'),
            location: profile.get('location')
        }
    };
};

module.exports = {
    mapFromParse,
    mapFromParseV1
};