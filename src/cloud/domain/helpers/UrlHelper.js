const stripResourceFromUri = url => {
    return url.substring(url.lastIndexOf('/') + 1);
};

module.exports = {
    stripResourceFromUri
};