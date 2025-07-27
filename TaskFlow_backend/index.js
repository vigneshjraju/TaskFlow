import express,{json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";

import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

const app=express();
dotenv.config();

const PORT=process.env.PORT;

app.use(cors({origin:"*",credentials: true}))
app.use(json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('TaskFlow backend is running!');
});


app.listen(PORT,()=>{
    console.log(`Server is listening to the Port ${PORT}`);
})

mongoose.connect('mongodb://localhost:27017/Taskflow').then(()=>{
    console.log('MongoDB connected successfully to Taskflow');  
})

.catch((error) => {
    console.log("MongoDB failed to connect to Taskflow:", error);
    
})