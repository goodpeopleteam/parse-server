const _ = require('lodash');
const TalentService = require("../../service/TalentService");
const Talent = require("../../model/Talent");

module.exports.execute = async (term) => {
    const results = await TalentService.search(term);
    const talents = results.map(Talent.map);
    return _.orderBy(talents, ['name']);
};