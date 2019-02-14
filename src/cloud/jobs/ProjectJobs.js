const QueryCreator = require('../domain/helpers/QueryCreator');
const ProjectService = require('../domain/service/ProjectService');
const UserService = require('../domain/service/UserService');
const NormalizeProjectUc = require("../domain/usecases/project/normalize-project-uc");
const LOG_PREFIX = `JOB: FIX PROJECT USER REFERENCE:`;

module.exports.normalizeProjects = async(req, status) => {
    const pageSize = 200;

    const projectCount = await ProjectService.count();
    const pages = Math.ceil(projectCount / pageSize);

    const savePromises = [];

    for (let currentPage = 0; currentPage < pages; currentPage++) {
        const projectsQuery = QueryCreator.createQuery('Projects');

        projectsQuery.skip(pageSize * currentPage);
        projectsQuery.limit(pageSize);

        let projectBatch = await projectsQuery.find();

        for (let i = 0; i < projectBatch.length; i++) {
            const p = projectBatch[i];

            try {
                NormalizeProjectUc(p);
                savePromises.push(p.save());
            } catch (e) {
                status.error(e.code, e.message);
            }
        }
    }

    await Promise.all(savePromises);
};

module.exports.FixProjectUserReference = async (req, status) => {
    const logger = req.log;
    const pageSize = 200;

    const projectCount = await ProjectService.count();
    const pages = projectCount / pageSize;

    for (let currentPage = 0; currentPage < pages; currentPage++) {
        const projectsQuery = QueryCreator.createQuery('Projects');

        projectsQuery.skip(pageSize * currentPage);
        projectsQuery.limit(pageSize);
        projectsQuery.doesNotExist("user");

        let projectBatch = await projectsQuery.find();

        for (let i = 0; i < projectBatch.length; i++) {
            const p = projectBatch[i];

            if (p.get('user'))
                continue;

            try {
                const user = await UserService.getById(p.get('userID'));

                if (!user) {
                    logger.info(`${LOG_PREFIX} project: ${p.get('title')} destroyed`);
                    await p.destroy();
                } else {
                    const userReference = new Parse.User();
                    userReference.id = user.id;

                    p.set('user', userReference);
                    await p.save();

                    logger.info(`${LOG_PREFIX} project: ${p.get('title')} fixed`);
                }
            } catch (e) {
                logger.error(e);
                status.error(e.code, e.message);
            }
        }
    }
    status.success();
};
