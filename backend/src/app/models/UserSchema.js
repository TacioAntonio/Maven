const mongoose = require('../../database/index');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: [12, 'Maximum 12 characters.'],
        validate: {
            validator: function (v) {
                return /^(?=.*?[a-zA-Zà-úÀ-Ú]).{1,12}$/i.test(v);
            }
        },
        require: [true, 'Name is required.'],
    },
    email: {
        type: String,
        minLength: 1,
        maxLength: [50, 'Maximum 50 characters.'],
        validate: {
            validator: function (v) {
                return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(v);
            }
        },
        require: [true, 'Email is required.'],
    },
    password: {
        type: String,
        minLength: [8, 'Minimum of 12 characters.'],
        maxLength: [12, 'Maximum 12 characters.'],
        validate: {
            validator: function (v) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/i.test(v);
            }
        },
        require: [true, 'Password is required.'],
    },
    imagePath: {
        type: String,
        default: '../../assets/users/1.png',
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        require: true,
    },
    midiaIds: {
        type: Array,
        ofObjectId: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

UserSchema.pre("updateOne", function (next) {
    const action = this._update;
    const operation = Object.keys(action)[0];

    if (operation !== '$set') {
        const handleAction = {
            '$addToSet': next,
            '$pull': next
        }

        return handleAction[`${operation}`]();
    }

    if (!this._update.$set.password) {
        return next();
    }

    this._update.$set.password = bcrypt.hashSync(this._update.$set.password, 10);

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;