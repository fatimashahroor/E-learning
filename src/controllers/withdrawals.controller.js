import Withdrawal from '../models/withdrawal.model.js';

const withdrawal = {
    createWithdrawalRequest: async (req, res) => {
        const { studentId, courseId, reason } = req.body;
        try {
            const newWithdrawal = new Withdrawal({
                studentId,
                courseId,
                reason
            });
            await newWithdrawal.save();
            res.status(201).json({ message: "Withdrawal request created successfully", withdrawal: newWithdrawal });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateWithdrawalStatus: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;  // Expected to be either 'approved' or 'rejected'
        try {
            const updatedWithdrawal = await Withdrawal.findByIdAndUpdate(id, { status }, { new: true });
            if (!updatedWithdrawal) {
                return res.status(404).json({ message: 'Withdrawal request not found' });
            }
            res.status(200).json({ message: "Withdrawal status updated successfully", withdrawal: updatedWithdrawal });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listWithdrawals: async (req, res) => {
        try {
            const withdrawals = await Withdrawal.find().populate('studentId', 'name').populate('courseId', 'title');
            res.status(200).json(withdrawals);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}