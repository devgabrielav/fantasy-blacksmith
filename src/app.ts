import express from 'express';
import productsRoutes from './routes/products.routes';
import ordersRoutes from './routes/orders.routes';

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

app.use('/orders', ordersRoutes);

export default app;
