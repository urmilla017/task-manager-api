const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

// schema -> to create middleware
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            // if(value === 'password') {
            if(value.toLowerCase().includes('password')) {
                throw new Error('password should not be password');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        // custom validator
        validate(value) {
            if(value < 0) {
                throw new Error('age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('email is invalid');
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

// to remove important data like password and token
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email: email });
    if(!user) {
        throw new Error('unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('unable to login');
    }
    return user;
}

// this needs to be a normal function and not an arrow function
// because arrow functions don't bind 'this'
// hash plain text pwd before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// delete use tasks when user is deleted
userSchema.pre('remove', async function(next) {
    const user = this;

    await Task.deleteMany({ owner: user._id });

    next();
});

const User = mongoose.model('User', userSchema);

// const me = new User({
//     name: 'Dirk',
//     password: 'qwertyuiop',
//     age: 23,
//     email: 'drik@drik.com'
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error)
// });

module.exports = User;