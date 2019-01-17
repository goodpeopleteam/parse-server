const Project = require('../domain/model/Project');
const ProjectService = require('../domain/service/ProjectService');
const UserService = require('../domain/service/UserService');
const ProfileService = require('../domain/service/ProfileService');

const create = async (req, res) => {
    const userId = req.user.id;
    const projectParam = req.params.project;

    try {
        const result = await Promise.when([
            UserService.get(userId),
            ProfileService.getByUserId(userId)
        ]);

        const project = await ProjectService.add({
            data: {
                title: projectParam.title,
                description: projectParam.description,
                requiredTalents: projectParam.requiredTalents
            },
            user: result[0],
            profile: result[1]
        });

        res.success(project);
    } catch (e) {
        res.error(e.message);
    }
};

const get = async (req, res) => {
    const page = req.params.page;

    try {
        const parseProjects = await ProjectService.get(page);

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
    const userId = req.user.id;

    try {
        const result = await Promise.when([
            ProfileService.getByUserId(userId),
            ProjectService.getUsersProjects(userId)
        ]);

        const profile = result[0];
        const parseProjects = result[1];

        res.success(parseProjects.map(p => Project.mapFromParse(p, profile)));
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
