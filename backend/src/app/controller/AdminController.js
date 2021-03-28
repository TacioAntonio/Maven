const Midia = require('../models/MidiaSchema');
const User = require('../models/UserSchema');
const { regexName, regexEmail } = require('../../util/regex');

/*
 * # [Read, Update e Delete] - usuário
 * # [Create, Update e Delete] midias
*/
class AdminController {
    async insertMidia(req, res) {
        const { name, imagePath, trailerUrl, category } = req.body;

        try {
            // Checar se já existe, se existir não adiciona
            if (!name) {
                return res.status(400).json({ message: 'Name is not provided.' });
            }

            if (!imagePath) {
                return res.status(400).json({ message: 'ImagePath is not provided.' });
            }

            if (!trailerUrl) {
                return res.status(400).json({ message: 'TrailerUrl is not provided.' });
            }

            if (!category) {
                return res.status(400).json({ message: 'Category is not provided.' });
            }

            const midia = await Midia.findOne({ name });

            if (midia) {
                return res.status(400).json({ message: 'Media already exists.' });
            }

            await Midia.create({ name, imagePath, trailerUrl, category });

            return res.status(200).json({ message: "Midia was created." });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async updateMidia(req, res) {
        const { id, name, imagePath, trailerUrl, category } = req.body;

        try {
            if (!id) {
                return res.status(400).json({ message: 'MidiaId was not provided.' });
            }

            if (!name) {
                return res.status(400).json({ message: 'Name was not provided.' });
            }

            if (!imagePath) {
                return res.status(400).json({ message: 'ImagePath was not provided.' });
            }

            if (!trailerUrl) {
                return res.status(400).json({ message: 'TrailerUrl was not provided.' });
            }

            if (!['Movies', 'Series'].includes(category)) {
                return res.status(400).json({ message: 'Category was not provided.' });
            }

            const midia = await Midia.findById({ _id: id });

            if (!midia) {
                return res.status(400).json({ message: 'Media does not exist.' });
            }

            await Midia.updateOne({ _id: id }, {
                $set: {
                    name,
                    imagePath,
                    trailerUrl,
                    category
                }
            })

            return res.status(200).json({ message: "Midia was updated." });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async deleteMidia(req, res) {
        const { id } = req.body;

        try {
            if (!id) {
                return res.status(400).json({ message: 'MidiaId was not provided.' });
            }

            await Midia.deleteOne({ _id: id });

            return res.status(200).json({ message: "Midia was deleted." });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    // User - Read, Update e Delete
    async collectUsers(req, res) {
        try {
            const user = await User.find({ isAdmin: false }, { password: 0 });

            if (!user) {
                return res.status(400).json({ message: 'User not exist.' });
            }

            return res.status(200).json({ user });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async updateTheUser(req, res) {
        const { email, name, isAdmin, userId } = req.body;

        try {
            if (!email.match(regexEmail)) {
                return res.status(400).json({ message: 'It is not a valid email.' });
            }

            if (name.length > 12 || !name.match(regexName)) {
                return res.status(400).json({ message: 'The name must contain a maximum of 12 characters and only letters.' });
            }

            if (!userId) {
                return res.status(400).json({ message: 'Id not found.' });
            }

            const user = await User.findById({ _id: userId }, { "_id": 0, "password": 1 });

            if (!user) {
                return res.status(400).json({ message: 'User not exist.' });
            }

            await User.updateOne({ _id: userId }, {
                $set: {
                    name,
                    email,
                    isAdmin
                }
            });

            return res.status(200).json({ message: 'User updated successfully.' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.body;

        try {
            if (!id) {
                return res.status(400).json({ message: 'UserId was not provided.' });
            }

            await User.deleteOne({ _id: id });

            return res.status(200).json({ message: "User was deleted." });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new AdminController();