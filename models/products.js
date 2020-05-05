import mongoose from 'mongoose';

const ProductsSchema = mongoose.Schema({
    brand_name: String,
    product_name: String,
    ingredients: Array,
});

const Products = mongoose.model('Products', ProductsSchema);

export default Products;
