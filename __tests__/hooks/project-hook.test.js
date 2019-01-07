import TestableParseObject from "../TestableParseObject";

const projectHooks = require('../../src/cloud/hooks/project-hooks');

describe('project-hooks tests', () => {
    let proj;

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
            beforeEach(() => {
                proj.data['userID'] = "userID";

                projectHooks.checkUserReference(proj);
            });

            it('set is called with user reference', () => {
                expect(proj.set.mock.calls[0][1]).toBe('userID');
            });

            it('add is called', () => {
                expect(proj.add.mock.calls.length).toBe(1);
            });
        });
    });
});