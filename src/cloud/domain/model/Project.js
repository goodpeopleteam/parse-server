const User = require('./User');

function getProfilePictureUrl(profile, profilePicture) {
    if (profile) {
        return User.getProfilePictureUrl(profile);
    }

    if (!profilePicture)
        return "";
    const url = profilePicture.url();
    return url;
}

const mapFromParseV1 = (project) => {
    const id = project.id;
    const title = project.get('title');
    const description = project.get('description');
    const skillsNeeded = project.get('skillsNeeded') || [];

    const profile = project.get('user');
    let profilePicture = project.get('userImageProfile');

    const profilePictureUrl = getProfilePictureUrl(profile, profilePicture);

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
                profilePictureUrl: profilePictureUrl
            }
        };
    }

    const firstName = profile.get('firstName') ? profile.get('firstName').trim() : '';
    const lastName = profile.get('lastName') ? profile.get('lastName').trim() : '';

    return {
        id,
        title,
        description,
        requiredTalents: skillsNeeded,
        profile: {
            id: profile.id,
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`,
            profilePictureUrl: profilePictureUrl,
            location: {
                country: profile.get('country'),
                city: profile.get('city'),
                location: profile.get('location')
            }
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
    mapFromParseV1,
    mapFromParse
};