const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'urmilla.k@gmail.com',
//     from: 'urmilla.k@gmail.com',
//     subject: 'this is my first creation!',
//     text: 'i hope this one works!'
// });

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'urmilla.k@gmail.com',
        subject: 'thanks for joining in!',
        text: `Welcome to the app, ${name}.Let me know how it goes.`
    });
};

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'urmilla.k@gmail.com',
        subject: 'Sorry you have to go!',
        text: `We are sorry to let you go, ${name}. Is there anything you would like to tell us?`
    });
};

module.exports = {
    sendWelcomeEmail: sendWelcomeEmail,
    sendCancelEmail
};