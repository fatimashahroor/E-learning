import Enrollment from '../models/enrollment.model.js';
import Class from '../models/class.model.js';
import Course from '../models/course.model.js';

const enrollment = {
    enrollInClass: async (req, res) => {
        const { studentId, classId } = req.body;
        try {
            const selectedClass = await Class.findById(classId);
            if (!selectedClass) {
                return res.status(404).json({ message: "Class not found" });
            }

            const enrollment = new Enrollment({
                studentId,
                classId
            });
            await enrollment.save();
            selectedClass.courses.forEach(async courseId => {
                const courseEnrollment = new Course({
                    studentId,
                    courseId
                });
                await courseEnrollment.save();
            });

            res.status(201).json({ message: "Enrollment successful", enrollment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateEnrollment: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!updatedEnrollment) {
                return res.status(404).json({ message: 'Enrollment not found' });
            }
            res.json({ message: "Enrollment updated successfully", data: updatedEnrollment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getEnrollmentDetails: async (req, res) => {
        const { id } = req.params;
        try {
            const enrollmentDetails = await Enrollment.findById(id).populate('studentId').populate('classId');
            if (!enrollmentDetails) {
                return res.status(404).json({ message: 'Enrollment not found' });
            }
            res.json({ data: enrollmentDetails });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default enrollment;