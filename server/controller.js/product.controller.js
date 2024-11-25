const { Product } = require("../model/products")
const { Category } = require("../model/categories");
const { validateProduct } = require("../validator/validateProduct");
const { default: mongoose } = require("mongoose");

const createProduct = async (req, res) => {
    try {
        validateProduct(req)
        const { categoryId, name, description, price, images, fabricType, stock } = req.body;

        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        const product = new Product({
            categoryId,
            name,
            description,
            price,
            images,
            fabricType,
            stock
        });

        await product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating product.",
            error: "ERROR: " + error.message
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("categoryId", "name description categoryImage");
        res.status(200).json({
            success: true,
            message: "products fetched successfully!",
            totalProducts: products.length,
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error fetching products.",
            error: "Error: " + error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID."
            });
        }

        const product = await Product.findById(id).populate("categoryId", "name description categoryImage");
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching product.",
            error: "ERROR: " + error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID."
            });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting product.",
            error: "ERROR: " + error.message
        });
    }
};

// update is pending 

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    deleteProduct
}