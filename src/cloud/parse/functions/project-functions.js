const CreateProjectUc = require("../../domain/usecases/project/create-project-uc");
const GetProjectsUc = require("../../domain/usecases/project/get-projects-uc");
const GetProjectUc = require("../../domain/usecases/project/get-project-uc");
const GetMyProjectsUc = require("../../domain/usecases/project/get-my-projects-uc");
const SearchProjectsUc = require("../../domain/usecases/project/search-projects-uc");
const UpdateProjectUc = require("../../domain/usecases/project/update-project-uc");
const DeleteProjectUc = require("../../domain/usecases/project/delete-project-uc");

Parse.Cloud.define('Project_create', async (req) => {
    try {
        return await CreateProjectUc.execute(req.user, req.params.project);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Project_get', async (req) => {
    try {
        return await GetProjectsUc.execute(req.user, req.params.page);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Project_getById', async (req) => {
    try {
        return await GetProjectUc.execute(req.user, req.params.id);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Project_myProjects', async (req) => {
    try {
        return await GetMyProjectsUc.execute(req.user);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Project_search', async (req) => {
    try {
        return await SearchProjectsUc.execute(req.params.term);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Project_update', async (req) => {
    try {
        await UpdateProjectUc.execute(req.user, req.params.projectId, req.params.field, req.params.value);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Project_delete', async (req) => {
    try {
        await DeleteProjectUc.execute(req.user, req.params.projectId);
    } catch (e) {
        console.log(e);
    }
});