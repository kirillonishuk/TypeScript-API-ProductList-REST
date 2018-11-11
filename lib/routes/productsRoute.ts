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
            /**
             * @api {get} /products Get product list
             * @apiVersion 0.1.0
             * @apiName GetProductList
             * @apiGroup Product
             * 
             * @apiSuccess {Object[]} productList List of product.
             * @apiSuccess {String} productList._id         Product _id.
             * @apiSuccess {String} productList.name        Product name.
             * @apiSuccess {String} productList.color       Product color.
             * @apiSuccess {String} productList.image       Product image(base64).
             * @apiSuccess {Number} productList.cost        Product cost.
             * @apiSuccess {String} productList.description Product description.
             * 
             * @apiSuccessExample Success-Response:
             *     HTTP/1.1 200 OK
             *     [
             *      {
             *       "_id": "1",
             *       "name": "Milk",
             *       "color": "#000000",
             *       "image": "image:base64",
             *       "cost": 1.49,
             *       "description": "Smthing.",
             *      }
             *     ]
             */
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
            /**
             * @api {post} /products Add product
             * @apiVersion 0.1.0
             * @apiName AddProduct
             * @apiGroup Product
             * 
             * @apiParam {String} name        Product name.
             * @apiParam {String} color       Product color or empty.
             * @apiParam {String} image       Product image(base64) or empty.
             * @apiParam {Number} cost        Product cost.
             * @apiParam {String} description Product description or empty.
             *
             * @apiSuccess {String} _id         Product _id.
             * @apiSuccess {String} name        Product name.
             * @apiSuccess {String} color       Product color.
             * @apiSuccess {String} image       Product image(base64).
             * @apiSuccess {Number} cost        Product cost.
             * @apiSuccess {String} description Product description.
             * 
             * @apiError (Error 400) {String} message Error message
             * @apiError (Error 400) {String} info    Error info
             * 
             * @apiParamExample Request-Example:
             *      {
             *       "name": "Milk",
             *       "color": "#000000",
             *       "image": "image:base64",
             *       "cost": 1.49,
             *       "description": "Smthing.",
             *     }
             * 
             * @apiSuccessExample Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "_id": "1",
             *       "name": "Milk",
             *       "color": "#000000",
             *       "image": "image:base64",
             *       "cost": 1.49,
             *       "description": "Smthing.",
             *     }
             * 
             * @apiErrorExample Error-Response:
             *     HTTP/1.1 400 Bad Request
             *     {
             *       "message": "Data isn't valid.",
             *       "info": "Body isn't correct."
             *     }
             */
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
            /**
             * @api {get} /products/:id Get product
             * @apiVersion 0.1.0
             * @apiName GetProduct
             * @apiGroup Product
             * 
             * @apiSuccess {String} _id         Product _id.
             * @apiSuccess {String} name        Product name.
             * @apiSuccess {String} color       Product color.
             * @apiSuccess {String} image       Product image(base64).
             * @apiSuccess {Number} cost        Product cost.
             * @apiSuccess {String} description Product description.
             * 
             * @apiError (Error 404) {String} message Error message
             * 
             * @apiSuccessExample Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "_id": "1",
             *       "name": "Milk",
             *       "color": "#000000",
             *       "image": "image:base64",
             *       "cost": 1.49,
             *       "description": "Smthing.",
             *     }
             * 
             * @apiErrorExample Error-Response:
             *     HTTP/1.1 404 Not Found
             *     {
             *       "message": "Product not found."
             *     }
             * 
             */
            .get((req: Request, res: Response) => {
                getOneDocumentFromCollection('products', req.params.id)
                    .then(data => {
                        if (data)
                            res.status(200)
                                .json(data)
                        else res.status(404)
                            .json({ message: 'Product not found.' })
                    }, error => {
                        res.status(500)
                            .json({ message: error.message })
                        console.log(error);
                    });
            })
            /**
            * @api {delete} /products/:id Delete product
            * @apiVersion 0.1.0
            * @apiName DeleteProduct
            * @apiGroup Product
            * 
            * @apiSuccess {String} message Product _id.
            * 
            * @apiError (Error 404) {String} message Error message
            * 
            * @apiSuccessExample Success-Response:
            *     HTTP/1.1 200 OK
            *     {
            *       "message": "Document with id=1 deleted."
            *     }
            * 
            * @apiErrorExample Error-Response:
            *     HTTP/1.1 404 Not Found
            *     {
            *       "message": "Document not found."
            *     }
            */
            .delete((req: Request, res: Response) => {
                deleteFromCollection('products', req.params.id)
                    .then(data => {
                        if (data && data.value)
                            res.status(200)
                                .json({ message: `Document with id=${data.value._id} deleted.` });
                        else res.status(404)
                            .json({ message: `Document not found.` });
                    }, error => {
                        res.status(500)
                            .json({ message: error.message })
                        console.log(error);
                    });
            })
            /**
            * @api {patch} /products/:id Patch product
            * @apiVersion 0.1.0
            * @apiName PatchProduct
            * @apiGroup Product
            * @apiDescription One of the parameters is required.
            * 
            * @apiParam {String} name        Optional Product name.
            * @apiParam {String} color       Optional Product color.
            * @apiParam {String} image       Optional Product image(base64).
            * @apiParam {Number} cost        Optional Product cost.
            * @apiParam {String} description Optional Product description.
            * 
            * @apiSuccess {String} _id         Product _id.
            * @apiSuccess {String} name        Product name.
            * @apiSuccess {String} color       Product color.
            * @apiSuccess {String} image       Product image(base64).
            * @apiSuccess {Number} cost        Product cost.
            * @apiSuccess {String} description Product description.
            * 
            * @apiError (Error 404) {String} message Error message
            * 
            * @apiSuccessExample Success-Response:
             *     HTTP/1.1 404 Not Found
             *     {
             *       "_id": "1",
             *       "name": "Milk",
             *       "color": "#000011",
             *       "image": "image:base64",
             *       "cost": 1.49,
             *       "description": "Smthing.",
             *     }
             * 
             * @apiErrorExample Error-Response:
            *     HTTP/1.1 200 OK
            *     {
            *       "message": "Document not found."
            *     }
            */
            .patch((req: Request, res: Response) => {
                try {
                    let body = Product.DTOProduct(req.body);
                    if (!Object.keys(body).length) throw Error('Body is empty.')
                    updateDocumentInCollection('products', req.params.id, body)
                        .then(data => {
                            if (data && data.value)
                                res.status(200)
                                    .json(data.value)
                            else res.status(404)
                                .json({ message: `Document not found.` })
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