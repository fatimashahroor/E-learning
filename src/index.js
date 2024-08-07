import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/users.routes.js';
import classRouter from './routes/classes.routes.js';
import enrollmentRouter from './routes/enrollments.routes.js';
import coursesRouter from './routes/courses.routes.js';
import withdrawalRouter from './routes/withdrawals.routes.js';

dotenv.config();

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.DATABASE_URL;


app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connection established'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/users', router);
app.use('/api/classes', classRouter);
app.use('/api/enrollments', enrollmentRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/withdrawals', withdrawalRouter);

// Basic route for home page
app.get('/', (req, res) => {
    res.send('Welcome to the E-Learning System API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});