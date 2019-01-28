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
    const userId = req.user.id;
    const page = req.params.page;

    try {
        const parseProjects = await ProjectService.get(userId, page);

        res.success(parseProjects.map(p => Project.mapFromParseV1(p)));
    } catch (e) {
        res.error(e.message);
    }
};

const getById = async (req, res) => {
    const id = req.params.id;

    try {
        res.success(await ProjectService.getById(id));
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
        res.success(await ProjectService.search(term))
    } catch (e) {
        res.error(e.message);
    }
};

module.exports = {
    create,
    get,
    getById,
    myProjects,
    search
};
