import * as express from 'express';
import * as path from 'path';
import { NextFunction } from 'connect';

import { ProductsRoutes } from './routes/productsRoute';

class App {
    public app: express.Application;
    public productsRoute: ProductsRoutes = new ProductsRoutes();

    constructor() {
        this.app = express();
        this.config();
    };

    private config(): void {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use((req: express.Request, res: express.Response, next: NextFunction) => {
            res.append('Access-Control-Allow-Origin', ['*']);
            res.append('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            res.append('Access-Control-Expose-Headers', 'X-Total-Count, X-Pagination-Page-Count, X-Pagination-Current-Page');
            res.append('Cache-Control', 'no-cache');
            res.append('Content-Type', 'application/json');
            next();
        });

        // routes
        this.productsRoute.routes(this.app);

        this.app.use((req: express.Request, res: express.Response, next: NextFunction) => {
            res.status(404)
                .json({ message: `Method ${req.method} by the route ${req.path} not found.` });
        });
    };

};

export default new App().app;