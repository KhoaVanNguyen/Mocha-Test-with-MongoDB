const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length >= 2 ,
            message: 'Name must be longer than 2 characters'
        },
        required: [true,'Name is require']
    },
    postCount: Number,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
})

UserSchema.pre('remove', function(next){
    const Posts = mongoose.model('post')
    console.log('I am hereeeeee')
    Posts.remove({ _id: {  $in: this.posts   }    })
        .then( () => next() )
})


const User = mongoose.model('user',UserSchema)


module.exports = User   
