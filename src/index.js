import electron from 'electron';
import dotenv from 'dotenv';
import connectToDatabase from './database/connection';

const app= electron();
dotenv.config();

app.use(electron.json());

app.listen(3000, () => {
    console.log('server started');
    connectToDatabase();
})