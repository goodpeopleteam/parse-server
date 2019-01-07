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

// project
Parse.Cloud.beforeSave('Projects', ProjectHooks.beforeSave);

// profile
Parse.Cloud.afterSave("Profile", Chat.createUser);

// cloud functions
// profile functions
Parse.Cloud.define('Profile.create', Profile.create);
Parse.Cloud.define('Profile.upsertAbout', Profile.upsertAbout);
Parse.Cloud.define('Profile.upsertTalents', Profile.upsertTalents);
Parse.Cloud.define('Profile.get', Profile.get);
Parse.Cloud.define('Profile.getById', Profile.getById);
Parse.Cloud.define('Profile.search', Profile.search);

// project functions
Parse.Cloud.define('Project.create', Project.create);
Parse.Cloud.define('Project.get', Project.get);
Parse.Cloud.define('Project.getById', Project.getById);
Parse.Cloud.define('Project.myProjects', Project.myProjects);
Parse.Cloud.define('Project.search', Project.search);

// favorite functions
Parse.Cloud.define('Favorite.add', Favorite.add);
Parse.Cloud.define('Favorite.hasFavorite', Favorite.hasFavorite);
Parse.Cloud.define('Favorite.myFavorites', Favorite.myFavorites);

// chat functions
Parse.Cloud.define('Chat.createChatRoom', Chat.createChatRoom);
Parse.Cloud.define('Chat.getUserChatRooms', Chat.getUserChatRooms);

// layer functions
Parse.Cloud.define('generateToken', Layer.generateToken);

// jobs
Parse.Cloud.job('mapProfiles', ProfileJobs.MapProfiles);
Parse.Cloud.job('fixProjectProfileReference', ProjectJobs.FixProjectProfileReference);
Parse.Cloud.job('fixProjectUserReference', ProjectJobs.FixProjectUserReference);