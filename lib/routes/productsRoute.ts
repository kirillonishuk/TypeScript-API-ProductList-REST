import { Request, Response } from 'express';
import {
    getCollection,
    addToCollection,
    deleteFromCollection,
    getOneDocumentFromCollection,
    updateDocumentInCollection
} from '../controllers/repository';
import Product from '../models/product';

interface IProductRequest extends Request {
    body: {
        name: string,
        color?: string,
        cost: number,
        image?: string,
        description?: string
    }
}

export class ProductsRoutes {
    public routes(app): void {
        app.route('/products')
            .get((req: Request, res: Response) => {
                getCollection('products')
                    .then(data => {
                        res.status(200)
                            .json(data)
                    }, error => {
                        res.status(500)
                            .json({ message: error.message })
                        console.log(error);
                    })
            })
            .post((req: IProductRequest, res: Response) => {
                try {
                    let body: Product = new Product({ ...req.body })
                    addToCollection('products', body.show)
                        .then(data => {
                            res.status(200)
                                .json(data.ops[0])
                        }, error => {
                            res.status(500)
                                .json({ message: error.message })
                            console.log(error);
                        })
                } catch (error) {
                    console.log(`----------ERROR----------`);
                    console.log(`Internal Server Error: \n\t${error.message}`);
                    console.log(`-----------END-----------`);
                    res.status(400)
                        .json({
                            message: `Data isn't valid.`,
                            info: error.message
                        })
                }
            });

        app.route('/products/:id')
            .get((req: Request, res: Response) => {
                getOneDocumentFromCollection('products', req.params.id)
                    .then(data => {
                        res.status(200)
                            .json(data)
                    }, error => {
                        res.status(500)
                            .json({ message: error.message })
                        console.log(error);
                    });
            })
            .delete((req: Request, res: Response) => {
                deleteFromCollection('products', req.params.id)
                    .then(data => {
                        res.status(200)
                            .json({ message: `Document with id=${data.value._id} deleted.` })
                    }, error => {
                        res.status(500)
                            .json({ message: error.message })
                        console.log(error);
                    });
            })
            .patch((req: Request, res: Response) => {
                try {
                    let body = Product.DTOProduct(req.body);
                    if (!Object.keys(body).length) throw Error('Body is empty.')
                    updateDocumentInCollection('products', req.params.id, body)
                        .then(data => {
                            res.status(200)
                                .json(data.value)
                        }, error => {
                            res.status(500)
                                .json({ message: error.message })
                            console.log(error);
                        })
                } catch (error) {
                    console.log(`----------ERROR----------`);
                    console.log(`Internal Server Error: \n\t${error.message}`);
                    console.log(`-----------END-----------`);
                    res.status(400)
                        .json({
                            message: `Data isn't valid.`,
                            info: error.message
                        })
                }
            })
    };
}