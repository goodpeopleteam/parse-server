module.exports.execute = user => {
    const firstName = user.get('firstName') || '';
    const lastName = user.get('lastName') || '';

    let completeName = firstName.trim() + ' ' + lastName.trim();

    completeName = completeName.toLowerCase();

    user.set('completeName', completeName);
};