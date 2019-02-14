module.exports.execute = (proj) => {
    const androidDescription = 'description';
    const iosDescription = 'detailedDescription';

    const androidTitle = 'title';
    const iosTitle = 'searchableTitle';

    if (!proj.get(iosTitle) || !proj.get(iosDescription)) {
        proj.set(iosTitle, proj.get(androidTitle));
        proj.set(iosDescription, proj.get(androidDescription))
    }
};