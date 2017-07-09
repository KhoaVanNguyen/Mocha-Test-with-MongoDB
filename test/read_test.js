const assert = require("assert");
const User = require("../src/user");

describe("Read record", () => {
  // create user

  // find user

  let user;

  beforeEach(done => {
    console.log("in beforeEach");
    // how to save many users?
    user = new User({ name: "khoa", address: "HCM" });
    user.save().then(() => done());
  });

//   it("find by address", done => {
//     User.find({ address: "HCM" }).then(users => {
//       assert(users[0].address === user.address);
//       done();
//     });
//   });


  it("find by username", done => {
    User.find({ name: "khoa" }).then(users => {
      assert(users.length > 0);
      done();
    });
  });
});
