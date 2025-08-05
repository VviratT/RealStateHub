import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js'; 
import cors from 'cors';
app.use(cors({
  origin: 'https://realstatehub.vercel.app'
}));



let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 8000;
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

startServer();
