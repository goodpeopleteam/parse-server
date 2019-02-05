const Profile = require('./functions/profile-functions');
const Project = require('./functions/project-functions');
const Favorite = require('./functions/favorite-functions');
const Chat = require('./functions/chat-functions');
const Layer = require('./functions/layer-functions');
const ProjectJobs = require('./jobs/ProjectJobs');
const ProfileJobs = require('./jobs/ProfileJobs');

// hooks
const UserHooks = require('./hooks/user-hooks');
const ProjectHooks = require('./hooks/project-hooks');

// hooks
//user
Parse.Cloud.beforeSave(Parse.User, UserHooks.beforeSave);
Parse.Cloud.afterSave(Parse.User, UserHooks.afterSave);

// project
Parse.Cloud.afterSave('Projects', ProjectHooks.afterSave);

// profile
Parse.Cloud.afterSave("Profile", Chat.createUser);

// cloud functions
// profile functions
Parse.Cloud.define('Profile_create', Profile.create);
Parse.Cloud.define('Profile_upsertAbout', Profile.upsertAbout);
Parse.Cloud.define('Profile_upsertTalents', Profile.upsertTalents);
Parse.Cloud.define('Profile_get', Profile.get);
Parse.Cloud.define('Profile_getById', Profile.getById);
Parse.Cloud.define('Profile_search', Profile.search);

// project functions
Parse.Cloud.define('Project_create', Project.create);
Parse.Cloud.define('Project_get', Project.get);
Parse.Cloud.define('Project_getById', Project.getById);
Parse.Cloud.define('Project_myProjects', Project.myProjects);
Parse.Cloud.define('Project_search', Project.search);
Parse.Cloud.define('Project_update', Project.update);
Parse.Cloud.define('Project_delete', Project.destroy);

// favorite functions
Parse.Cloud.define('Favorite_add', Favorite.add);
Parse.Cloud.define('Favorite_hasFavorite', Favorite.hasFavorite);
Parse.Cloud.define('Favorite_myFavorites', Favorite.myFavorites);

// chat functions
Parse.Cloud.define('Chat_startChat', Chat.startChat);
Parse.Cloud.define('Chat_getUserChatRooms', Chat.getUserChatRooms);

// layer functions
Parse.Cloud.define('generateToken', Layer.generateToken);

// jobs
Parse.Cloud.job('mapProfiles', ProfileJobs.MapProfiles);
Parse.Cloud.job('fixProjectProfileReference', ProjectJobs.FixProjectProfileReference);
Parse.Cloud.job('fixProjectUserReference', ProjectJobs.FixProjectUserReference);