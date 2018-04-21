import Project from '../domain/model/Project';
import Profile from "../domain/model/Profile";

export const get = (req, res) => {
    const ParseProject = Parse.Object.extend('Projects');
    const query = new Parse.Query(ParseProject);

    query.limit(10);

    query.find()
        .then(projects => projects.map(p => Project.mapFromParse(p)))
        .then(projects => res.success(projects));
};

export const getById = (req, res) => {
    const id = req.params.id;

    const Project = Parse.Object.extend('Projects');
    const query = new Parse.Query(Project);

    query.get(id)
        .then(p => Profile.mapFromParse(p))
        .then(project => res.success(project));
};
