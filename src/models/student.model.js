import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    username: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    age: {
        type: Number,
    },

})

export const Student = mongoose.model('Student', studentSchema)