import defaultImage from '../static/product.image';
import { strict } from 'assert';

export default class Product {
    name: string;
    color: string;
    cost: number;
    image: string;
    description: string | null;

    constructor(body: {
        name: string,
        color?: string,
        cost: number,
        image?: string,
        description?: string | null,
    }) {
        if (!body.name || !body.cost) throw Error(`Body isn't correct.`);
        this.name = body.name;
        this.color = body.color || '#75aaff';
        this.cost = body.cost;
        this.image = body.image || defaultImage;
        this.image = Product.deletePrefixFromImage(this.image);
        this.description = body.description || null;
    }

    static DTOProduct = (data) => {
        let product: {
            name?: string,
            color?: string,
            cost?: number,
            image?: string,
            description?: string
        } = {};
        if (data.name) product.name = data.name;
        if (data.color) product.color = data.color;
        if (data.cost) product.cost = data.cost;
        if (data.image) product.image = Product.deletePrefixFromImage(data.image);
        if (data.description) product.description = data.description;
        return product;
    }

    static deletePrefixFromImage = (image: string) => image.split(',').length === 2 ?
        image.split(',')[1] : image;

    public get show() {
        return {
            name: this.name,
            color: this.color,
            cost: this.cost,
            image: this.image,
            description: this.description
        };
    }

}