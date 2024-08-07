import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    materials: [{  
        title: String,
        url: String,
        uploadedDate: Date
    }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
