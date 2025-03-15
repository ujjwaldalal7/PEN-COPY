import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js';
import cors from 'cors'
import ProductRoutes from './routes/ProductRoutes.js '
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config(); // Load environment variables
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
}));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products',ProductRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/orders',orderRoutes);

// Root route
app.get('/', function (req, res) {
  res.send('Hello World, Server is started');
});

// Auth routes

// Additional route
app.get('/title', function (req, res) {
  res.send('Hello World, Title');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
