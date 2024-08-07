import Course from '../models/course.model.js';

const courses = {
    createCourse: async (req, res) => {
        try {
            const { title, description, materials } = req.body;
            const newCourse = new Course({
                title,
                description,
                materials
            });
            await newCourse.save();
            res.status(201).json({ message: "Course created successfully", course: newCourse });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCourse: async (req, res) => {
        const { id } = req.params;
        try {
            const course = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json({ message: "Course updated successfully", course });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCourseDetails: async (req, res) => {
        const { id } = req.params;
        try {
            const course = await Course.findById(id).populate('name email');
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listCourses: async (req, res) => {
        try {
            const courses = await Course.find({});
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }, 
}

export default courses;