const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeauth', { useNewUrlParser: true, useCreateIndex: true });

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    github: {
        type: JSON
    }
})
UserSchema.statics.findOneOrCreate = async function findOneOrCreate(condition){
    let user = await this.findOne(condition);

    if(!user) {
        user = await this.create(condition);
    }
    return user;
};
const User = module.exports = mongoose.model('User', UserSchema);
