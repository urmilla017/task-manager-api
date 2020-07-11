const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

// const task = new Task({
//     description: 'Read books',
//     completed: false
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// });

module.exports = Task;