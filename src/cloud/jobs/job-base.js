const QueryCreator = require("../domain/helpers/QueryCreator");

module.exports.JobBase = async (countFunction, className, useCase) => {
    const pageSize = 200;

    const itemsCount = await countFunction();
    const pages = Math.ceil(itemsCount / pageSize);

    const savedPromises = [];

    for (let currentPage = 0; currentPage < pages; currentPage++) {
        const query = QueryCreator.createQuery(className);

        query.skip(pageSize * currentPage);
        query.limit(pageSize);

        let batch = await query.find();

        for (let i = 0; i < batch.length; i++) {
            const entity = batch[i];

            try {
                savedPromises.push(await useCase(entity));
            } catch (e) {
                status.error(e.code, e.message);
            }
        }
    }

    return await Promise.all(savedPromises);
};