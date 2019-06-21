const UserService = require("../../service/UserService");
const TalentService = require("../../service/TalentService");
const User = require("../../model/User");

module.exports.execute = async (term) => {
    const queries = [];

    const talents = await TalentService.search(term);

    for (const talent of talents) {
        const talentQuery = UserService.createQuery();
        talentQuery.equalTo('talents', talent);
        talentQuery.include('talents');

        queries.push(talentQuery);
    }

    const completeNameQuery = UserService.createQuery();
    completeNameQuery.matches('completeName', RegExp(term, 'gi'));
    queries.push(completeNameQuery);


    const compoundQuery = Parse.Query.or(...queries);
    compoundQuery.include('talents');

    const users = await compoundQuery.find();

    return users.map(User.mapFromParse);
};
