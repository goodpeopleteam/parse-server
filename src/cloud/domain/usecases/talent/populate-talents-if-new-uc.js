const TalentService = require("../../service/TalentService");

module.exports.execute = async (parseObject, talentsPropertyName, skills) => {
    if(!skills || skills.length === 0) {
        return;
    }

    const talents = [];

    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        let talent = await TalentService.findByName(skill);
        if (!talent) {
            talent = await TalentService.add(skill);
        }
        talents.push(talent);
    }

    parseObject.set(talentsPropertyName, talents);
    return parseObject;
};