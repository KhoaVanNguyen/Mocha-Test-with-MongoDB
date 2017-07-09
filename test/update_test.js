const assert = require("assert");
const User = require("../src/user");

describe("update records: ", () => {
  let khoa;

  beforeEach(done => {
    khoa = new User({ name: "khoa", postCount: 0 });
    khoa.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => {
      User.find({}).then(users => {
        console.log(users);
        assert(users.length === 1);
        assert(users[0].name !== "khoa");
        done();
      });
    });
  }

  it("update by model instance", done => {
    khoa.set("name", "alex");
    assertName(khoa.save(), done);
  });

  it("update by model instance", done => {
    assertName(khoa.update({ name: "alex" }), done);
  });

  it("update by class", done => {
    assertName(User.update({ name: "khoa" }, { name: "Alex" }), done);
  });

  it("update by findOneAndUpdate", done => {
    assertName(User.findOneAndUpdate({ name: "khoa" }, { name: "alex" }), done);
  });

  it("update by findById", done => {
    assertName(User.findByIdAndUpdate(khoa._id, { name: "Alex" }), done);
  });

  it("increase postCount by 1", done => {

    User.update({ name: 'khoa' }, { $inc: { postCount: 3 } }).then(
      () => {
        User.findOne( { name: 'khoa' } ).then( user =>{

          assert(user.postCount === 3)
          done()
        } )
      }
    )
    


  })

});
