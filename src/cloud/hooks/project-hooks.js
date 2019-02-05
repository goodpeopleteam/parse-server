const UserService = require("../domain/service/UserService");

const addUserReference = async proj => {
    if (proj.get('user'))
        return;

    const userReference = await UserService.getById(proj.get('userID'));

    proj.set('user', userReference);
    return await proj.save();
};

const afterSave = async (req) => {
    const proj = req.object;

    try {
        return await addUserReference(proj);
    } catch (e) {
        throw e;
    }
};

module.exports = {
    afterSave
    /* BEGIN_DEBUG */,
    checkUserReference: addUserReference
    /* END_DEBUG */
};