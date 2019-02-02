const Project = require('../domain/model/Project');
const ProjectService = require('../domain/service/ProjectService');
const UserService = require('../domain/service/UserService');
const ProfileService = require('../domain/service/ProfileService');

const create = async (req, res) => {
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

        res.success(Project.mapFromParseV1(project));
    } catch (e) {
        res.error(e.message);
    }
};

const get = async (req, res) => {
    const user = req.user;
    const page = req.params.page;

    try {
        const parseProjects = await ProjectService.get(user.id, page);

        res.success(parseProjects.map(p => Project.mapFromParseV1(p)));
    } catch (e) {
        res.error(e.message);
    }
};

const getById = async (req, res) => {
    const user = req.user;
    const id = req.params.id;

    try {
        const project = await ProjectService.getById(id);

        res.success(Project.mapFromParseV1(project));
    } catch (e) {
        res.error(e.message);
    }
};

const myProjects = async (req, res) => {
    const user = req.user;

    try {
        const result = await ProjectService.getUsersProjects(user);

        res.success(result.map(p => Project.mapFromParseV1(p)));
    } catch (e) {
        res.error(e.message);
    }
};

const search = async (req, res) => {
    const term = req.params.term;

    try {
        const searchResult = await ProjectService.search(term);
        res.success(searchResult.map(Project.mapFromParseV1));
    } catch (e) {
        res.error(e.message);
    }
};

const update = async (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;
    const fieldToUpdate = req.params.field;
    const value = req.params.value;

    try {
        const proj = await ProjectService.getById(projectId);

        proj.set(fieldToUpdate, value);

        const savedProj = await proj.save();

        res.success(Project.mapFromParseV1(savedProj));
    } catch (e) {
        res.error(e.message);
    }
};

const destroy = async (req, res) => {
    const user = req.user;
    const projectId = req.params.projectId;

    try {
        const project = await ProjectService.getById(projectId);
        await project.destroy();

        res.success();
    } catch (e) {
        res.error(e.message);
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
