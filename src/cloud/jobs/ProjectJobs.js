const QueryCreator = require('../domain/helpers/QueryCreator');
const ProjectService = require('../domain/service/ProjectService');
const UserService = require('../domain/service/UserService');
const LOG_PREFIX = `JOB: FIX PROJECT USER REFERENCE:`;

module.exports.FixProjectUserReference = async (req, status) => {
    const logger = req.log;
    const pageSize = 50;

    const projectCount = await ProjectService.count();
    const pages = projectCount / pageSize;

    for (let currentPage = 0; currentPage < pages; currentPage++) {
        const projectsQuery = QueryCreator.createQuery('Projects');

        projectsQuery.skip(pageSize * currentPage);
        projectsQuery.limit(pageSize);

        let projectBatch = await projectsQuery.find();

        for (let i = 0; i < projectBatch.length; i++) {
            const p = projectBatch[i];

            if (p.get('user'))
                continue;

            try {
                const userReference = await UserService.getById(p.get('userID'));

                if (!userReference) {
                    logger.info(`${LOG_PREFIX} project: ${p.get('title')} destroyed`);
                    await p.destroy();
                } else {
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

module.exports.FixProjectProfileReference = async (req, status) => {
    const logger = req.log;
    const pageSize = 1;

    const projectCount = await ProjectService.count();
    const pages = projectCount / pageSize;

    for (let currentPage = 0; currentPage < pages; currentPage++) {
        const getPagedProjectsQuery = QueryCreator.createQuery('Projects');
        getPagedProjectsQuery.skip(pageSize * currentPage);

        let projectBatch = await getPagedProjectsQuery.find();

        for (let i = 0; i < projectBatch.length; i++) {
            const p = projectBatch[i];

            if (p.get('profile'))
                continue;

            const user = new Parse.User();
            user.id = p.get('userID');

            const profileQuery = QueryCreator.createQuery('Profile');
            profileQuery.equalTo('user', user);

            try {
                const profile = await profileQuery.first();

                p.set('profile', profile);
                await p.add();

                logger.info(`${LOG_PREFIX} project: ${p.get('title')} fixed`);
            } catch (e) {
                logger.error(e);
            }
        }
    }
};
