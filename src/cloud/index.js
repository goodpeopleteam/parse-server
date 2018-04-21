import {get as ProfileGet, getById as ProfileGetById} from './profile/profile-functions';
import {get as ProjectGet, getById as ProjectGetById} from './project/project-functions';

Parse.Cloud.define('Profile.get', ProfileGet);
Parse.Cloud.define('Profile.getById', ProfileGetById);

Parse.Cloud.define('Project.get', ProjectGet);
Parse.Cloud.define('Project.getById', ProjectGetById);