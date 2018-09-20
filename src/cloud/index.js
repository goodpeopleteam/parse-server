const Profile = require('./functions/profile-functions');
const Project = require('./functions/project-functions');
const Favorite = require('./functions/favorite-functions');

// chat functions
const Chat = require('./functions/chat-functions');

// jobs
const MapProfiles = require('./jobs/ProfileJobs').MapProfiles;
const FixProjecProfileReference = require('./jobs/ProjectJobs').FixProjectProfileReference;

// triggers
// profile
Parse.Cloud.afterSave("Profile", Chat.createUser);

// cloud functions
Parse.Cloud.define('Profile.create', Profile.create);
Parse.Cloud.define('Profile.upsertAbout', Profile.upsertAbout);
Parse.Cloud.define('Profile.upsertTalents', Profile.upsertTalents);
Parse.Cloud.define('Profile.get', Profile.get);
Parse.Cloud.define('Profile.getById', Profile.getById);
Parse.Cloud.define('Profile.search', Profile.search);

Parse.Cloud.define('Project.create', Project.create);
Parse.Cloud.define('Project.get', Project.get);
Parse.Cloud.define('Project.getById', Project.getById);
Parse.Cloud.define('Project.myProjects', Project.myProjects);
Parse.Cloud.define('Project.search', Project.search);

Parse.Cloud.define('Favorite.add', Favorite.add);
Parse.Cloud.define('Favorite.hasFavorite', Favorite.hasFavorite);
Parse.Cloud.define('Favorite.myFavorites', Favorite.myFavorites);

// chat functions
Parse.Cloud.define('Chat.createChatRoom', Chat.createChatRoom);
Parse.Cloud.define('Chat.getUserChatRooms', Chat.getUserChatRooms);

Parse.Cloud.job('mapProfiles', MapProfiles);
Parse.Cloud.job('fixProjectProfileReference', FixProjecProfileReference);