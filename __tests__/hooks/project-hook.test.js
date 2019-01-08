import TestableParseObject from "../TestableParseObject";
import UserService from '../../src/cloud/domain/service/UserService';

const projectHooks = require('../../src/cloud/hooks/project-hooks');

describe('project-hooks tests', () => {
    let proj;

    beforeAll(() => {
        UserService.getById = jest.fn();
    });

    describe('checkUserReference', () => {
        beforeEach(() => {
            proj = new TestableParseObject();
        });

        describe('with user reference', () => {
            beforeEach(() => {
                proj.data['user'] = {};

                projectHooks.checkUserReference(proj);
            });

            it('add is not called', () => {
                expect(proj.add.mock.calls.length).toBe(0);
            });
        });

        describe('without user reference', () => {
            const userIdValue = 'userID';
            const user = { userID: userIdValue };

            beforeEach(() => {
                UserService.getById.mockReturnValue(user);

                proj.data['userID'] = userIdValue;
                projectHooks.checkUserReference(proj);
            });

            it('set is called with user reference', () => {
                expect(proj.set.mock.calls[0][0]).toBe('user');
                expect(proj.set.mock.calls[0][1]).toBe(user);
            });
        });
    });
});
