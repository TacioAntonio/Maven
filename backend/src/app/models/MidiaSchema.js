const mongoose = require('../../database/index');

const MidiaSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: [100, 'Maximum 100 characters.'],
        require: [true, 'Name is required.'],
    },
    imagePath: {
        type: String,
        minLength: 1,
        maxLength: [100, 'Maximum 100 characters.'],
        require: [true, 'ImagePath is required.'],
    },
    trailerUrl: {
        type: String,
        minLength: 1,
        maxLength: [50, 'Maximum 50 characters.'],
        require: [true, 'TrailerUrl is required.'],
    },
    category: {
        type: String,
        enum: ['Movies', 'Series'],
        minLength: [6, 'Minimum of 6 characters.'],
        maxLength: [6, 'Maximum 6 characters.'],
        require: [true, 'Category is required.'],
    }
});

const Midia = mongoose.model('Midia', MidiaSchema);

module.exports = Midia;