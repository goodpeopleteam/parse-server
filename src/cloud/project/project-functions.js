import Project from '../domain/model/Project';

export const get = (req, res) => {
    const ParseProject = Parse.Object.extend('Projects');
    const query = new Parse.Query(ParseProject);

    query.limit(10);

    query.find()
        .then(projects => projects.map(p => Project.mapFromParse(p)))
        .then(projects => res.success(projects));
};
