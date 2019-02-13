const UserService = require("../domain/service/UserService");

const addUserReference = async proj => {
    if (proj.get('user'))
        return;

    const userReference = await UserService.getById(proj.get('userID'));

    proj.set('user', userReference);
    return await proj.save();
};

const normalizeProject = async (req) => {
    const proj = req.object;

    const androidDescription = 'description';
    const iosDescription = 'detailedDescription';

    const androidTitle = 'title';
    const iosTitle = 'searchableTitle';

    if (!proj.get(androidDescription)) {
        proj.set(androidDescription, proj.get(iosDescription));
    }

    if (!proj.get(iosDescription)) {
        proj.set(iosDescription, proj.get(androidDescription));
    }

    if(!proj.get(androidTitle)) {
        proj.set(androidTitle, proj.get(iosTitle));
    }

    if (!proj.get(iosTitle)) {
        proj.set(iosTitle, proj.get(androidTitle));
    }
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