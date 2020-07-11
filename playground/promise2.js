require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.deleteOne({
//     _id: '5eff5ba3d3b507225c5c5bfc'
// }).then((task) => {
//    console.log(task);
//    return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

// promise chaining
// Task.findByIdAndDelete('5eff5ba3d3b507225c5c5bfc').then((task) => {
//    console.log(task);
//    return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

// async and await
const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed })
    return count;
};

deleteTaskAndCount('5f01f3442ea3a62a507fe207', true).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});