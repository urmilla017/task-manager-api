const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');
const { setMaxListeners } = require('../models/user');
const router = express.Router();

// dummy route for testing
// router.get('/test', (req, res) => {
//     res.send('router from new file');
// });

// app.post('/users', (req, res) => {
//     // console.log(req.body);
//     // res.send('testing');
//     const user = new User(req.body);

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     });
// });
router.post('/users', async (req, res) => {
    // console.log(req.body);
    // res.send('testing');
    const user = new User(req.body);

    try {
        await user.save();

        // check account.js for sendgrid
        sendWelcomeEmail(user.email, user.name);

        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

// logout router
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    } catch (e) {
    }
    res.status(500).send();
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// /users/me => lets user get their own profile
router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send(e);
    // }
    res.send(req.user);
});

// /:id -> route hander
// dynamic parameters to catch values
// router.get('/users/:id', async (req, res) => {
//     // console.log(req.params);

//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

// patch => to update existing resource
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid update' });
    }

    try {
        // this bypasses mongoose while using middleware
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        // so use this
        // const user = await User.findById(req.params.id);

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        // if(!user) {
        //     return res.status(404).send();
        // }
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// delete -> to delete existing resource
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        // if(!user) {
        //      return res.status(404).send();
        // }

        // to get user id -> req.user._id
        await req.user.remove();

        sendCancelEmail(req.user.email, req.user.name);

        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// file upload
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000 // 1MB
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload jpg, jpeg or png file'));
        }

        cb(undefined, true);
    }
});
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // req.user.avatar = req.file.buffer;
    // update it with sharp library
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;