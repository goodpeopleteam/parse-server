const Talent = require("./Talent");

const mapFromParse = (x) => {
  return {
    id: x.id,
    isOwnProfile: x.isOwnProfile,
    email: x.get('email'),
    firstName: x.get('firstName'),
    lastName: x.get('lastName'),
    about: x.get('about'),
    talents: x.get('talents') !== undefined ? x.get('talents').map(Talent.map) : [],
    isFavorite: x.isFavorite,
    favorites: x.get('favorites') || [],
    profilePictureUrl: getProfilePictureUrl(x),
    location: {
      position: x.get('userPosition'),
      location: x.get('location'),
      country: x.get('country'),
      city: x.get('city')
    }
  };
};

const getProfilePictureUrl = (parseProfile) => {
  const authData = parseProfile.get('authData');
  if (!authData) {
    const profilePicture = parseProfile.get('profilePicture');
    if (!profilePicture)
      return '';

    return profilePicture.url();
  }

  const facebookId = authData.facebook.id;
  if (facebookId)
    return getFacebookPictureUrl(facebookId);
};

const getFacebookPictureUrl = (facebookId) => {
  return `https://graph.facebook.com/${facebookId}/picture?type=large`;
};

module.exports = {
  mapFromParse,
  getProfilePictureUrl
};