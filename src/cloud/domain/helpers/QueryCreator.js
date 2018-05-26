module.exports.createQuery = (className) => {
    const ClassName = Parse.Object.extend(className);
    return new Parse.Query(ClassName);
};