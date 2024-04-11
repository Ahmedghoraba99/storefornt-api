//importing necessary modules
import express from 'express';
import personRoutes from './handlers/persons';
import orderRoutes from './handlers/orders';
import productsRoutes from './handlers/products';
const app: express.Application = express();
//MiddleWare
app.use(express.json());
//body parser
app.use(express.urlencoded({ extended: false }));

//using routes from handler
personRoutes(app);
orderRoutes(app);
productsRoutes(app);
const port = process.env.PORT;
//spinning the server
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
export default app;
