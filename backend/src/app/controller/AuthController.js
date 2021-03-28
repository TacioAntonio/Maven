const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_HASH, APP_CURRENT_URL_FRONTEND } = require('../../config/configurations');
const { sendEmail } = require('../../util/sendEmail');
const { regexEmail } = require('../../util/regex');

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            if (!email) {
                return res.status(400).json({ message: 'Fill in with an email.' });
            }

            if (!password) {
                return res.status(400).json({ message: 'Fill in with a password.' });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Email does not exist.' });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ message: 'Incorrect password.' });
            }

            const payload = {
                userId: user.id
            }

            const token = jwt.sign(payload, APP_HASH, { expiresIn: '1d' });

            return res.status(200).json({ auth: true, token });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async recoverPassword(req, res) {
        const { email } = req.body;

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        try {
            if (!email.match(regexEmail)) {
                return res.status(400).json({ message: 'It is not a valid email.' });
            }

            const user = await User.findOne({ email }, { _id: 1, name: 1 });

            if (!user) {
                return res.status(400).json({ message: 'There is no account with this email.' });
            }

            const payload = {
                userId: user.id,
                code: getRandomArbitrary(100000, 999999)
            }

            /**
             * * O token irá carregar um código de verificação
             * * Expira em 20 Minutos
             */
            const token = jwt.sign(payload, APP_HASH, { expiresIn: 20 * 60 });

            const subject = 'Your Maven password reset request';
            const message = `
                <p>Hello ${user.name},</p>
        
                <p>
                    <b>A request has been received to change the password for your Maven account.</b>
                </p>
                <p><b>Verification code</b> <h2>${payload.code}</h2></p>
                <center>
                <a 
                style="
                border-color: #ff1100;
                font-weight: 400;
                text-decoration: none;
                margin: 0;
                color: #ffffff;
                background-color: #ff1100;
                border: solid 1px #ff1100;
                border-radius: 2px;
                font-size: 14px;
                padding: 12px 45px;"
                href="${APP_CURRENT_URL_FRONTEND}/recover/${token}" 
                role="button">Reset password</a>.
                </center>
        
                <p>
                The link will expire in 20 minutes.
                </p>
                <p>Thank you!</p>
            `;

            sendEmail(email, subject, message);

            return res.status(200).json({ message: "The email was sent successfully." });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new AuthController();