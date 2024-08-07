import mongoose, {Schema } from "mongoose";

const userSchema = new Schema({
    fullname: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required : true,
        type: String,
        unique : true
    },
    role : {
        required : true,
        type : String,
        enum: ['student','admin'],
    
    },
    created_at : {
        type : Date,
        default: Date.now
    },

});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
const User = mongoose.model("User", userSchema);
export default User;