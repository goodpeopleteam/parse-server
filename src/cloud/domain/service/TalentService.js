const QueryCreator = require("../helpers/QueryCreator");

const findByName = async (name) => {
    const query = QueryCreator.createQuery("Talent");
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

module.exports = {
    findByName,
    add
};