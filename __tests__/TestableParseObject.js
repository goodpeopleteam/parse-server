export default class TestableParseObject {
    data = {};

    get = param => {
        return this.data[param];
    };

    set = jest.fn((param, value) => {
        this.data[param] = value;
    });

    add = jest.fn();
}
