export default class TestableParseObject {
    data = {};

    get = param => {
        return this.data[param];
    };

    set = (param, value) => {
        this.data[param] = value;
    };
}
