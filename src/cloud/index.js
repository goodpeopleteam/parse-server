const ProfileCreate = require('./profile/profile-functions').profileCreate;
const ProfileUpsertAbout = require('./profile/profile-functions').upsertAbout;
const ProfileGet = require('./profile/profile-functions').get;
const ProfileGetById = require('./profile/profile-functions').getById;
const ProfileGetPicture = require('./profile/profile-functions').getProfilePicture;

const ProjectGet = require('./project/project-functions').get;
const ProjectGetById = require('./project/project-functions').getById;

Parse.Cloud.define('Profile.create', ProfileCreate);
Parse.Cloud.define('Profile.upsertAbout', ProfileUpsertAbout);
Parse.Cloud.define('Profile.get', ProfileGet);
Parse.Cloud.define('Profile.getById', ProfileGetById);
Parse.Cloud.define('Profile.getPicture', ProfileGetPicture);

Parse.Cloud.define('Project.get', ProjectGet);
Parse.Cloud.define('Project.getById', ProjectGetById);