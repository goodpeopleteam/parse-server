const Project = require('../domain/model/Project');
const ProjectService = require('../domain/service/ProjectService');

const create = async (req) => {
    const user = req.user;
    const projectParam = req.params.project;

    try {
        const project = await ProjectService.add({
            data: {
                title: projectParam.title,
                description: projectParam.description,
                requiredTalents: projectParam.requiredTalents,
                user: user
            }
        });

        return Project.mapFromParseV1(project);
    } catch (e) {
        throw e;
    }
};

const get = async (req) => {
    const user = req.user;
    const page = req.params.page;

    try {
        const parseProjects = await ProjectService.get(user.id, page);

        return parseProjects.map(p => Project.mapFromParseV1(p));
    } catch (e) {
        throw e;
    }
};

const getById = async (req) => {
    const user = req.user;
    const id = req.params.id;

    try {
        const project = await ProjectService.getById(id);

        return Project.mapFromParseV1(project);
    } catch (e) {
        throw e;
    }
};

const myProjects = async (req, res) => {
    const user = req.user;

    try {
        const result = await ProjectService.getUsersProjects(user);

        return result.map(p => Project.mapFromParseV1(p));
    } catch (e) {
        throw e;
    }
};

const search = async (req) => {
    const term = req.params.term;

    try {
        const searchResult = await ProjectService.search(term);
        return searchResult.map(Project.mapFromParseV1);
    } catch (e) {
        throw e;
    }
};

const update = async (req) => {
    const user = req.user;
    const projectId = req.params.projectId;
    const fieldToUpdate = req.params.field;
    const value = req.params.value;

    try {
        const proj = await ProjectService.getById(projectId);

        proj.set(fieldToUpdate, value);

        const savedProj = await proj.save();

        return Project.mapFromParseV1(savedProj);
    } catch (e) {
        throw e;
    }
};

const destroy = async (req) => {
    const user = req.user;
    const projectId = req.params.projectId;

    try {
        const project = await ProjectService.getById(projectId);
        await project.destroy();
    } catch (e) {
        throw e;
    }
};

module.exports = {
    create,
    get,
    getById,
    myProjects,
    search,
    update,
    destroy
};
