import Class from '../models/class.model.js';

const classController = {
    createClass: async (req, res) => {
        try {
            const { title, description, instructor, startDate, endDate, courses } = req.body;
            const newClass = new Class({
                title,
                description,
                instructor,
                startDate,
                endDate,
                courses
            });
            await newClass.save();
            res.status(201).json(newClass);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateClass: async (req, res) => {
        try {
            const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedClass);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listClasses: async (req, res) => {
        try {
            const classes = await Class.find({});
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getClassDetails: async (req, res) => {
        try {
            const classDetails = await Class.findById(req.params.id).populate('instructor.instructorId', 'name email').populate('enrolledStudents.studentId', 'name status');
            if (!classDetails) {
                res.status(404).json({ message: 'Class not found' });
            } else {
                res.status(200).json(classDetails);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default classController;