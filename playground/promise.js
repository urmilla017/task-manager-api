require('../src/db/mongoose');
const User = require('../src/models/user');

// 5eff5e23fadee42276a5f4dc

// promise chaining
// User.findByIdAndUpdate( '5eff5e23fadee42276a5f4dc', { age: 1 }).then((user) => {
//    console.log(user);
//    return User.countDocuments({ age: 1 });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('5eff5e23fadee42276a5f4dc', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});