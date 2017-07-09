const assert = require("assert");
const User = require("../src/user");
const Post = require("../src/post");
const Comment = require("../src/comment");

describe("Test associate ", () => {
  beforeEach(done => {
    let khoa = new User({ name: "khoa" });
    let post = new Post({
      title: "First Post",
      content: "FUCK JS"
    });
    let comment = new Comment({ content: "Awesome" });

    khoa.posts.push(post);
    post.comments.push(comment);
    comment.user = khoa;

    Promise.all([khoa.save(), post.save(), comment.save()]).then(() => done());
  });

  xit("test create ", done => {
    User.findOne({ name: "khoa" }).populate("posts").
    then(user => {
    //   assert( user.posts[0].title === "FUCK JS" )
      console.log(user)
      done();
    });
  });

  it.only("test population", done => {

    User.findOne( { name: 'khoa' } )
        .populate({
            path: 'posts', 
            populate: {
                path: 'comments', // property when define Schema
                model: 'comment', // model name when export 
                populate:{
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then( user => {
            
            assert( user.posts[0].title ===  "First Post"   )
            assert( user.posts[0].comments[0].content ===  "Awesome"   )
            assert( user.posts[0].comments[0].user.name ===  "khoa"   )
            done()
        }  )



  })

});
