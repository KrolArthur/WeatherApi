import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import usersRoutes from './routes/users.js';
import deviceRoutes from './routes/devices.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/users', usersRoutes);
app.use('/devices', deviceRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log('Listening on port 3000...'));