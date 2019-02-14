module.exports.execute = async (user, fieldToUpdate, value) => {
    if (!fieldToUpdate) {
        throw Error("field must be defined");
    }

    if (!value) {
        throw Error("value must be defined");
    }

    user.set(fieldToUpdate, value);
    return await user.save(null, { useMasterKey: true });
};
