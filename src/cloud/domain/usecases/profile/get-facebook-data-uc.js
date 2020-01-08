const fetch = require('node-fetch');

module.exports.execute = async user => {
    const authData = user.get('authData');
    if (!authData) {
        return;
    }

    const fbData = authData.facebook;

    const url = `https://graph.facebook.com/v3.2/${fbData.id}?fields=email%2Cfirst_name%2Clast_name%2Clocation&access_token=${fbData.access_token}`;
    const response = await (await fetch(url)).json();

    user.set('facebookId', fbData.id);
    user.set('email', response.email || user.get('email'));
    user.set('firstName', response.first_name || user.get('firstName'));
    user.set('lastName', response.last_name || user.get('lastName'));
};
