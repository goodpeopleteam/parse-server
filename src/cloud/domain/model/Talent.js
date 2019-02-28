module.exports.map = x => {
    return {
        name: x.get('name').replace('\n', '').trim()
    }
};