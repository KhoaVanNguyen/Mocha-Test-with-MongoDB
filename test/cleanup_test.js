const assert = require("assert");
const User = require("../src/user");
const Post = require("../src/post");
const Comment = require("../src/comment");

describe("Test cleanup ", () => {
  let khoa, post;
  beforeEach(done => {
    khoa = new User({ name: "khoa" });
    post = new Post({
      title: "First Post",
      content: "FUCK JS"
    });
    let comment = new Comment({ content: "Awesome" });

    khoa.posts.push(post);
    post.comments.push(comment);
    comment.user = khoa;

    Promise.all([khoa.save(), post.save(), comment.save()]).then(() => done());
  });

  it("test remove", done => {
    khoa.remove().then(() => Post.count()).then(count => {
    //   console.log(count);
      assert(count === 0);
      done();
    });
  });
});
