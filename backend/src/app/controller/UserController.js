const User = require('../models/UserSchema');
const Midia = require('../models/MidiaSchema');

const bcrypt = require('bcryptjs');
const { sendEmail } = require('../../util/sendEmail');
const { regexName, regexEmail, regexPassword } = require('../../util/regex');

class UserController {
    async insertUser(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        try {
            if (name.length > 12 || !name.match(regexName)) {
                return res.status(400).json({ message: 'The name must contain a maximum of 12 characters and only letters.' });
            }

            if (!password.match(regexPassword)) {
                return res.status(400).json({ message: 'The password must be longer than 8 characters and less than 12 characters, containing numbers, letters and symbols.' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'The passwords do not match.' });
            }

            if (!email.match(regexEmail)) {
                return res.status(400).json({ message: 'It is not a valid email.' });
            }

            if (await User.findOne({ email })) {
                return res.status(400).json({ message: 'An account with this email already exists.' });
            }

            await User.create({ name, email, password });

            const subject = 'Welcome to Maven!';
            const message = `
                <h2>Welcome ${name} to Maven!</h2>

                <p><b>Password:</b> ${password}</p>

                <p>Thank you!</p>
            `;

            sendEmail(email, subject, message);

            return res.status(200).json({ message: 'User created successfully.' });
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }

    async findByIdUser(req, res) {
        const { id } = req.body;

        try {
            const user = await User.findById({ _id: id }, { "_id": 0, "name": 1, "email": 1, "imagePath": 1, "midiaIds": 1, "isAdmin": 1 });

            if (!user) {
                return res.status(400).json({ message: 'User not exist.' });
            }

            return res.status(200).json({ user });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async updateUser(req, res) {
        const { email, imagePath, name, password, userId } = req.body;

        try {
            if (!email.match(regexEmail)) {
                return res.status(400).json({ message: 'It is not a valid email.' });
            }

            if (!imagePath) {
                return res.status(400).json({ message: 'Avatar is required.' });
            }

            if (name.length > 12 || !name.match(regexName)) {
                return res.status(400).json({ message: 'The name must contain a maximum of 12 characters and only letters.' });
            }

            if (!password.match(regexPassword)) {
                return res.status(400).json({ message: 'The password must be longer than 8 characters and less than 12 characters, containing numbers, letters and symbols.' });
            }

            if (!userId) {
                return res.status(400).json({ message: 'Id not found.' });
            }

            const user = await User.findById({ _id: userId }, { "_id": 0, "password": 1 });

            if (!user) {
                return res.status(400).json({ message: 'User not exist.' });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ message: 'Incorrect password.' });
            }

            await User.updateOne({ _id: userId }, {
                $set: {
                    name,
                    email,
                    imagePath
                }
            });

            return res.status(200).json({ message: 'User updated successfully.' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async recoverUser(req, res) {
        const { code, confirmNewPassword, id, newPassword } = req.body;

        try {
            if (!id) {
                return res.status(400).json({ message: 'The user ID not found.' });
            }

            if (!code.match(/\d/g)) {
                return res.status(400).json({ message: 'The code must contain only numbers.' });
            }

            if (!newPassword.match(regexPassword)) {
                return res.status(400).json({ message: 'The password must be longer than 8 characters and less than 12 characters, containing numbers, letters and symbols.' });
            }

            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ message: 'The passwords do not match.' });
            }

            const user = await User.findById({ _id: id });

            if (!user) {
                return res.status(400).json({ message: 'User not exist.' });
            }

            await User.updateOne({ _id: id }, {
                $set: {
                    password: newPassword,
                }
            });

            return res.status(200).json({ message: 'Password was successfully changed.' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async insertBookmark(req, res) {
        const { userId, midiaId } = req.body;

        try {
            if (!userId) {
                return res.status(400).json({ message: 'The userId not found.' });
            }

            if (!midiaId) {
                return res.status(400).json({ message: 'The midiaId not found.' });
            }

            const user = await User.findById({ _id: userId });

            if (!user) {
                return res.status(400).json({ message: 'User not exist.' });
            }

            const midia = await Midia.findById({ _id: midiaId });

            if (!midia) {
                return res.status(400).json({ message: 'Midia not exist.' });
            }

            await User.updateOne({ _id: userId }, {
                $addToSet: {
                    midiaIds: midiaId
                }
            });

            return res.status(200).json({ message: 'Added to favorites.' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async collectFavoriteMidias(req, res) {
        const { midiaIds } = req.body;

        try {
            if (!midiaIds) {
                return res.status(400).json({ message: 'The midiaIds not found.' });
            }

            const midias = await Midia.find({
                _id: midiaIds
            })

            if (!midias) {
                return res.status(400).json({ message: 'The midias not found.' });
            }

            return res.status(200).json(midias);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async removeFavoriteMidia(req, res) {
        const { userId, midiaId } = req.body;

        try {
            if (!userId) {
                return res.status(400).json({ message: 'The userId not found.' });
            }

            if (!midiaId) {
                return res.status(400).json({ message: 'The midiaId not found.' });
            }

            const user = await User.findById({ _id: userId });

            if (!user) {
                return res.status(400).json({ message: 'User not exist.' });
            }

            const midia = await Midia.findById({ _id: midiaId });

            if (!midia) {
                return res.status(400).json({ message: 'Midia not exist.' });
            }

            const { nModified } = await User.updateOne({ _id: userId }, {
                $pull: {
                    midiaIds: midiaId
                }
            });

            if (nModified === 0) {
                return res.status(400).json({ message: 'Media does not exist in favorites.' });
            }

            return res.status(200).json({ message: 'Successfully removed from favorites' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new UserController();