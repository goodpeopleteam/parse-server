const mapFromParse = (x) => {
  return {
    id: x.id,
    email: x.get('email'),
    firstName: x.get('firstName'),
    lastName: x.get('lastName'),
    about: x.get('about'),
    talents: x.get('skills') || [],
    favorites: x.get('favorites') || [],
    profilePictureUrl: getProfilePictureUrl(x),
    location: {
      position: x.get('position'),
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