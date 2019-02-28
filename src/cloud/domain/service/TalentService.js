const QueryCreator = require("../helpers/QueryCreator");

function createQuery() {
    return QueryCreator.createQuery("Talent");
}

const findByName = async (name) => {
    const query = createQuery();
    query.fullText("name", name);
    return await query.first();
};

const add = async (name) => {
    try {
        const ParseTalent = Parse.Object.extend("Talent");
        const talent = new ParseTalent();
        talent.set('name', name);
        return await talent.save();
    } catch (e) {
        throw e;
    }
};

const search = async (term) => {
    const query = createQuery();

    query.matches('name', RegExp(term, 'gi'));
    query.limit(10);

    return await query.find();
};

module.exports = {
    findByName,
    add,
    search
};