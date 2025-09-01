import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import morgan from 'morgan';
import authRoutes from '../routes/authRoute.js';
import cors from 'cors'
import ProductRoutes from '../routes/ProductRoutes.js'
import cartRoutes from '../routes/cartRoutes.js'
import orderRoutes from '../routes/orderRoutes.js'

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
  origin: 'https://pen-copy.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products',ProductRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/orders',orderRoutes);

app.get('/', function (req, res) {
  res.send('Hello World, Server is started');
});

app.get('/title', function (req, res) {
  res.send('Hello World, Title');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app
