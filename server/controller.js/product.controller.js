const { Product } = require("../model/products")
const { Category } = require("../model/categories");
const { MoneyPicks } = require("../model/moneypicks.model")
const { validateProduct } = require("../validator/validateProduct");
const { default: mongoose } = require("mongoose");
const multer = require("multer")
const path = require("path");

// const createProduct = async (req, res) => {
//     try {
//         validateProduct(req)
//         const { categoryId, name, description, price, images, fabricType, discount, stock } = req.body;

//         const categoryExists = await Category.findById(categoryId);
//         if (!categoryExists) {
//             return res.status(404).json({ success: false, message: "Category not found." });
//         }

//         const product = new Product({
//             categoryId,
//             name,
//             description,
//             price,
//             images,
//             discount,
//             fabricType,
//             stock
//         });

//         await product.save();
//         res.status(201).json({
//             success: true,
//             message: "Product created successfully!",
//             data: product
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Error creating product.",
//             error: "ERROR: " + error.message
//         });
//     }
// };

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/product');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(new Error('Please upload a file with a valid format (jpeg, jpg, png)'));
    }
}).array('images', 4);


const createProduct = async (req, res) => {
    try {

        validateProduct(req);

        const { categoryId, name, description, price, fabricType, discount, stock, newArrival } = req.body;

        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        const images = req.files
            ? req.files.map((file, index) => ({
                url: file.path,
                altText: req.body.altText && req.body.altText[index] ? req.body.altText[index] : ""
            }))
            : [];

        images.forEach(image => {
            if (image.altText && image.altText.length > 100) {
                return res.status(400).json({ success: false, message: "Alt text cannot exceed 100 characters." });
            }
        });

        const product = new Product({
            categoryId,
            name,
            description,
            price,
            images: images,
            discount,
            fabricType,
            stock,
            newArrival
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
    const { page = 1, limit = 12, search = "" } = req.query

    const searchFilter = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { fabricType: { $regex: search, $options: "i" } },
            ],
        }
        : {};

    try {
        const products = await Product.find(searchFilter)
            .populate("categoryId", "name description categoryImage")
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
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

const newArrivals = async (req, res) => {
    const { page = 1, limit = 12 } = req.query;
    try {
        const products = await Product.find({ newArrival: true })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments({ newArrival: true });

        res.status(200).json({
            success: true,
            message: "New arrivals fetched successfully!",
            totalProducts: totalProducts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalProducts / limit),
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching new arrivals.",
            error: error.message,
        });
    }
};


const createMoneyPickProduct = async (req, res) => {
    try {

        validateProduct(req);

        const { categoryId, name, description, price, fabricType, discount, stock, newArrival } = req.body;

        const moneyPickExists = await MoneyPicks.findById({ _id: categoryId });
        console.log("moneyPickExists", moneyPickExists)
        if (!moneyPickExists) {
            return res.status(404).json({ success: false, message: "moneyPickExists not found." });
        }

        const images = req.files
            ? req.files.map((file, index) => ({
                url: file.path,
                altText: req.body.altText && req.body.altText[index] ? req.body.altText[index] : ""
            }))
            : [];

        images.forEach(image => {
            if (image.altText && image.altText.length > 100) {
                return res.status(400).json({ success: false, message: "Alt text cannot exceed 100 characters." });
            }
        });

        const product = new Product({
            categoryId,
            name,
            description,
            price,
            images: images,
            discount,
            fabricType,
            stock,
            newArrival
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


// update is pending 

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    deleteProduct,
    newArrivals,
    upload,
    createMoneyPickProduct
}