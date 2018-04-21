import {get as ProfileGet} from './profile';
import {get as ProjectGet} from './project/project-functions';

Parse.Cloud.define('Profile.get', ProfileGet);
Parse.Cloud.define('Project.get', ProjectGet);

