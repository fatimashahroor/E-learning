import express from 'express';
import enrollment from '../controllers/enrollments.controller.js';

const enrollmentRouter = express.Router();


enrollmentRouter.post('/', enrollment.enrollInClass);
enrollmentRouter.put('/:id', enrollment.updateEnrollment);
enrollmentRouter.get('/:id', enrollment.getEnrollmentDetails);

export default enrollmentRouter;
