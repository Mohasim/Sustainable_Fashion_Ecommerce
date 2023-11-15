import {db} from './db';

const Product = db.Product;

export const productRepo = {
    getAll,
    getById,
    createProduct,
    update,
    delete: _delete
}

async function getAll() {
    return await Product.find();
}

async function getById(id: string) {
    try{
        return await Product.findById(id);
    }
    catch{
        throw 'Product not found';
    }
}

async function createProduct(params: any) {
    const product= new Product(params);
    await product.save();
}

async function update(id: string, params: any) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    // copy params properties to product
    Object.assign(product, params);

    await product.save();
}

async function _delete(id: string) {
    await Product.findByIdAndRemove(id);
}