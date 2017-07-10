const assert = require("assert");
const User = require("../src/user");

describe("Create records", () => {
  let khoa, linh, nguyet, toan;
  beforeEach(done => {
    const khoa = new User({ name: "khoanguyen" });
    const linh = new User({ name: "linh nguyen" });
    const nguyet = new User({ name: "nguyet" });
    const toan = new User({ name: "toan" });

    Promise.all([
      khoa.save(),
      linh.save(),
      nguyet.save(),
      toan.save()
    ]).then(() => done());
  });

  // it("save users", (done) => {
  //   khoa.save().then(() => {
  //     assert(!khoa.isNew);
  //     done();
  //   });
  // });

  it.only("can skip and limit", done => {
    User.find({})
      .skip(2)
      .limit(2)
      .sort({
        name: 1
      })
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'nguyet');
        assert(users[1].name === 'toan');
        done();
      });
  });
});
