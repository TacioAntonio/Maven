const sgMail = require('@sendgrid/mail');
const { APP_SENDGRID_KEY, APP_ORGANIZATION_EMAIL } = require('../config/configurations');

async function sendEmail(email, subject, message) {
    sgMail.setApiKey(APP_SENDGRID_KEY);

    const msg = {
        to: email,
        from: APP_ORGANIZATION_EMAIL,
        subject: subject,
        html: message,
    };

    await sgMail.send(msg);
}

module.exports = { sendEmail };