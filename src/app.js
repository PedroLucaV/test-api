import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import router from './router/router.js';

import User from './models/userModel.js';

app.use('/', router);

sequelize.sync().then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

export default app;