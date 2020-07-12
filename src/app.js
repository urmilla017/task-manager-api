const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const { update } = require('./models/user');

const app = express();
// const port = process.env.PORT;

// express middleware
// without middleware: new request --> run route handler
// with middleware:    new request --> do something --> run route handler
// app.use((req, res, next) => {
//     // console.log(req.method, req.path);
//     // next();
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// });

// middleware for maintenance
// app.use((req, res, next) => {
//     res.status(503).send('site is currently down. check back soon');
// });

// file uploads
// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//         // limit: 1000000 = 1MB
//     },
//     fileFilter(req, file, cb) {
//         // if(!file.originalname.endsWith('.pdf')) {
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('please upload a word document'));
//         }

//         cb(undefined, true);
//         // cb(new Error('file must be a pdf'));
//         // cb(undefined, true);
//         // cb(undefined, false);
//     }
// });

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
// });


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// example -> new router
// const router = new express.Router();
// router.get('/test', (req, res) => {
//     res.send('this is from my other router');
// });
// app.use(router);

module.exports = app;


// hashing algorithm is not reversible
// const bcrypt = require('bcryptjs');
// const myFunction = async () => {
//     const password = 'Red12345!';
//     const hashedPassword = await bcrypt.hash(password, 8);
//     console.log(password);
//     console.log(hashedPassword);
//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
//     console.log(isMatch);
// };
// myFunction();



// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewstuff', { expiresIn: '7 days' });
//     console.log(token);
//     // example token
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1OTQzODk0NzJ9.UaCXhzgLzJJCVhNysF5VHaWz3XqQ8xTFGYBM0c0TmXg
//     // base 64 encoded json string
//     // 1st part: header 
//     // 2nd part: payload or body
//     // 3rd part: signature
//     const data = jwt.verify(token, 'thisismynewstuff');
//     console.log(data);
// }
// myFunction();


// relationship between two models
// const main = async () => {
//     const task = await Task.findById('5f08a0d43a97dd5501a1c8fc');
//     // find user who is associated with the task
//     await task.populate('owner').execPopulate();
//     console.log(task.owner);

//     const user = await User.findById('5f08a046042e6c54eba37bf8');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// };
// main();