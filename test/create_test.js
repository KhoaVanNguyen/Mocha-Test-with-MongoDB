
const assert = require("assert");
const User = require("../src/user");

describe("Create records", () => {
  it("save users", (done) => {
    const khoa = new User({ name: "khoanguyen" });
    khoa.save().then(() => {
      assert(!khoa.isNew);
      done();
    });
  });
});
