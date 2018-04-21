const Project = require('../domain/model/Project');

module.exports.get = (req, res) => {
    const ParseProject = Parse.Object.extend('Projects');
    const query = new Parse.Query(ParseProject);

    query.limit(10);

    query.find()
        .then(projects => projects.map(p => Project.mapFromParse(p)))
        .then(projects => res.success(projects));
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    const ParseProject = Parse.Object.extend('Projects');
    const query = new Parse.Query(ParseProject);

    query.get(id)
        .then(p => Project.mapFromParse(p))
        .then(project => res.success(project));
};
