const UserService = require("../domain/service/UserService");

const checkUserReference = async proj => {
    if (proj.get('user'))
        return;

    const userReference = await UserService.getById(proj.get('userID'));

    proj.set('user', userReference);
};

const beforeSave = async (req, resp) => {
    const proj = req.object;

    try {
        await checkUserReference(proj);
        resp.success();
    } catch (e) {
        console.log(e.message);
        resp.error(e.code, e.message);
    }
};

module.exports = {
    beforeSave
    /* BEGIN_DEBUG */,
    checkUserReference
    /* END_DEBUG */
};