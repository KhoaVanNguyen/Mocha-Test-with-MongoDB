const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/users_test");

  mongoose.connection
    .once("open", () => {
      // console.log(mongoose.connection.collections)
      done()
    }

     )
    .on("error", error => {
      console.error(error);
    });
});

beforeEach(done => {

  
  const { users, posts, comments } =  mongoose.connection.collections
  // console.log(mongoose.connection.collections )
  users.drop(() => {
    posts.drop( () => {
      comments.drop( () =>{
        done();
      } )
    } )
    
  });
});

// afterEach(done => {
//   mongoose.connection.collections.users.drop(() => {
//     console.log("after each");
//     done();
//   });
// });

