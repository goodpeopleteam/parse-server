import TestableParseObject from "../TestableParseObject";
const UserHooks = require('../../src/cloud/hooks/user-hooks');

describe('user-hooks tests', () => {
    let user;

    beforeEach(() => {
        user = new TestableParseObject();
    });

    describe('setUserCompleteName', () => {
        it('set complete name trimming first and last names', () => {
            user.data.firstName = ' firstName ';
            user.data.lastName = ' lastName ';

            UserHooks.setUserCompleteName(user);

            expect(user.data.completeName).toBe('firstname lastname');
        })
    })
});
