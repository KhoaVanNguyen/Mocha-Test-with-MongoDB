const assert = require("assert");
const User = require("../src/user");

describe("validate when create new user ", () => {
  it("validate name ", done => {
    const user = new User({ name: undefined });

    const validateResult = user.validateSync();

    const { message } = validateResult.errors.name;

    assert(message === "Name is require");
    done();
  });

  it("validate name length", done => {
    const user = new User({ name: "K" });
    const validateResult = user.validateSync();

    const { message } = validateResult.errors.name;

    assert(message === "Name must be longer than 2 characters");
    done();
  });
  it("disallows save invalid data", done => {
    const user = new User({ name: "K" });
    user.save().catch(validateResult => {
      const { message } = validateResult.errors.name;
      assert(message === "Name must be longer than 2 characters");
      done();
    });
  });
});
