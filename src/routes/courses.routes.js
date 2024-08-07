import express from 'express';
import courses from '../controllers/courseController.js';

const coursesRouter = express.Router();

coursesRouter.post('/', courses.createCourse);
coursesRouter.put('/:id', courses.updateCourse);
coursesRouter.get('/:id', courses.getCourseDetails);
coursesRouter.get('/', courses.listCourses);

export default coursesRouter;
