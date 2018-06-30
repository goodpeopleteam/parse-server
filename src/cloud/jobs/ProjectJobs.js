const QueryCreator = require('../domain/helpers/QueryCreator');
const LOG_PREFIX = `JOB: FIX PROJECT USER REFERENCE:`;

module.exports.FixProjectProfileReference = async (req, status) => {
    const logger = req.log;
    const pageSize = 1;

    const projectCount = await QueryCreator.createQuery('Projects').count();
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
                await p.save();

                logger.info(`${LOG_PREFIX} project: ${p.get('title')} fixed`);
            } catch (e) {
                logger.error(e);
            }
        }
    }
};