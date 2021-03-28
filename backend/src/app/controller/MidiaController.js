const Midia = require('../models/MidiaSchema');

/**
 * Movies and Series
 */
class MidiaController {
    async collectMidias(req, res) {
        try {
            const midia = await Midia.find({});

            if (!midia) {
                return res.status(400).json({ message: 'Midia not exist.' });
            }

            return res.status(200).json({ midia });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async findByIdMidia(req, res) {
        const { id } = req.body;

        try {
            const midia = await Midia.findById({ _id: id }, { "_id": 0, "name": 1, "imagePath": 1, "trailerUrl": 1, "category": 1 });

            if (!midia) {
                return res.status(400).json({ message: 'Midia not exist.' });
            }

            return res.status(200).json({ midia });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new MidiaController();