const assert = require("assert");
const User = require("../src/user");

describe("delete records: ", () => {
  let khoa;

  beforeEach(done => {
    khoa = new User({ name: "khoa" });
    khoa.save().then(() => done());
  });

  it("class instance", done => {
    khoa.remove({ name: "khoa" }).then(() => {
      User.findOne({ name: "khoa" }).then(user => {
        assert(user === null);
        done();
      });
    });
  });
  it("remove() ", done => {
    User.remove({ name: "khoa" }).then(() => {
      User.findOne({ name: "khoa" }).then(user => {
        assert(user === null);
        done();
      });
    });
  });

  it("findOneAndRemove()", done => {
    User.findOneAndRemove({ name: "khoa" }).then(user => {
      assert(user._id.toString() === khoa._id.toString());
      done();
    });
  });

  it("removebyID()", done => {
    User.findByIdAndRemove(khoa._id).then(user => {
      console.log(user);
      assert(user._id.toString() === khoa._id.toString());
      done();
    });
  });
});
