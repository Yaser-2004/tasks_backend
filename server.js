import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = 5000;

app.use(cors({
  origin: ["http://localhost:5173", "https://tasks-sandy-one.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

//yasersiddiquee_db_user
//2OhpSjZaofoKQqZS
