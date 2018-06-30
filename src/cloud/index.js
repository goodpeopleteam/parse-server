const ProfileCreate = require('./profile/profile-functions').create;
const ProfileUpsertAbout = require('./profile/profile-functions').upsertAbout;
const ProfileUpsertTalents = require('./profile/profile-functions').upsertTalents;
const ProfileGet = require('./profile/profile-functions').get;
const ProfileGetById = require('./profile/profile-functions').getById;
const ProfileGetPicture = require('./profile/profile-functions').getProfilePicture;

const ProjectCreate = require('./project/project-functions').create;
const ProjectGet = require('./project/project-functions').get;
const ProjectGetById = require('./project/project-functions').getById;
const ProjectMyProjects = require('./project/project-functions').myProjects;

const FavoriteAdd = require('./favorite/favorite-functions').add;
const FavoriteHasFavorite = require('./favorite/favorite-functions').hasFavorite;
const FavoriteMyFavorites = require('./favorite/favorite-functions').myFavorites;

// jobs
const MapProfiles = require('./jobs/ProfileJobs').MapProfiles;

Parse.Cloud.define('Profile.create', ProfileCreate);
Parse.Cloud.define('Profile.upsertAbout', ProfileUpsertAbout);
Parse.Cloud.define('Profile.upsertTalents', ProfileUpsertTalents);
Parse.Cloud.define('Profile.get', ProfileGet);
Parse.Cloud.define('Profile.getById', ProfileGetById);
Parse.Cloud.define('Profile.getPicture', ProfileGetPicture);

Parse.Cloud.define('Project.create', ProjectCreate);
Parse.Cloud.define('Project.get', ProjectGet);
Parse.Cloud.define('Project.getById', ProjectGetById);
Parse.Cloud.define('Project.myProjects', ProjectMyProjects);

Parse.Cloud.define('Favorite.add', FavoriteAdd);
Parse.Cloud.define('Favorite.hasFavorite', FavoriteHasFavorite);
Parse.Cloud.define('Favorite.myFavorites', FavoriteMyFavorites);

Parse.Cloud.job('mapProfiles', MapProfiles);