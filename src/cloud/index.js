const ProfileGet = require('./profile/profile-functions').get;
const ProfileGetById = require('./profile/profile-functions').getById;

const ProjectGet = require('./project/project-functions').get;
const ProjectGetById = require('./project/project-functions').getById;

Parse.Cloud.define('Profile.get', ProfileGet);
Parse.Cloud.define('Profile.getById', ProfileGetById);

Parse.Cloud.define('Project.get', ProjectGet);
Parse.Cloud.define('Project.getById', ProjectGetById);