import express from 'express';
const classRouter = express.Router();
import classController from '../controllers/classes.controller.js';

classRouter.post('/', classController.createClass);
classRouter.put('/:id', classController.updateClass);
classRouter.get('/', classController.listClasses);
classRouter.get('/:id', classController.getClassDetails);

export default classRouter;