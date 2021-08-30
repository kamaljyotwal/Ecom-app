const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLenght: [50, "name should be under thirty characters"],
        required: [true, "please provide a name for the user"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please provide a email for the user"],
        validate: [validator.isEmail, "Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "provide password"],
        select: false,
        minLength: 6
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },

    // below fields will be used when we add functionality when user forget password etc.
    resetPasswordToken: String,
    resetPasswordExpire: Date
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})



module.exports = mongoose.model("users", userSchema)