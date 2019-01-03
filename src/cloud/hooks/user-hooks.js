const fetch = require('node-fetch');

const beforeSave = async (req, resp) => {
    req.master = true;
    const object = req.object;
    try {
        const authData = object.get('authData');
        if (!authData){
            resp.success();
        } else {
            const fbData = authData.facebook;

            const url = `https://graph.facebook.com/v3.2/${fbData.id}?fields=email%2Cfirst_name%2Clast_name%2Clocation&access_token=${fbData.access_token}`;
            const response = await (await fetch(url)).json();

            object.set('email', response.email);
            object.set('firstName', response.first_name);
            object.set('lastName', response.last_name);

            resp.success();
        }
    } catch (e) {
        resp.error(e.message);
    }
};

module.exports = {
    beforeSave
};