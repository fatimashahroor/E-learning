import express from 'express';
import withdrawal from '../controllers/withdrawals.controller.js';

const withdrawalRouter = express.Router();

withdrawalRouter.post('/', withdrawal.createWithdrawalRequest);
withdrawalRouter.put('/:id', withdrawal.updateWithdrawalStatus);
withdrawalRouter.get('/', withdrawal.listWithdrawals);

export default withdrawalRouter;
