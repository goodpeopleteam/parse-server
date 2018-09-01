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
    mapFromParse
};