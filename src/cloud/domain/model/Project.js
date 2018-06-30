module.exports = class Project {
    static mapFromParse(project, profile) {
        const id = project.id;
        const title = project.get('title');
        const description = project.get('description');
        const requiredTalents = project.get('requiredTalents');

        if (!profile) {
            return {
                id,
                title,
                description,
                requiredTalents
            };
        }

        return {
            id,
            title,
            description,
            requiredTalents,
            profile: {
                id: profile.id,
                firstName: profile.get('firstName'),
                lastName: profile.get('lastName'),
                location: profile.get('location')
            }
        };
    }
};