const UserService = require("../domain/service/UserService");

const addUserReference = async proj => {
    if (proj.get('user'))
        return;

    const userReference = await UserService.getById(proj.get('userID'));

    proj.set('user', userReference);
    return await proj.save();
};

const afterSave = async (req, resp) => {
    const proj = req.object;

    try {
        const savedProject = await addUserReference(proj);
        resp.success(savedProject);
    } catch (e) {
        console.log(e.message);
        resp.error(e.code, e.message);
    }
};

module.exports = {
    afterSave
    /* BEGIN_DEBUG */,
    checkUserReference: addUserReference
    /* END_DEBUG */
};