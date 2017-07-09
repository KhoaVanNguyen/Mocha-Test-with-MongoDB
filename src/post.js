const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PostSchema = new Schema({
    title: String,
    content:  String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
},{
    collection: 'posts'
})

const Post = mongoose.model('post',PostSchema)

module.exports = Post