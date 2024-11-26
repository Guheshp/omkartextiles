const { default: mongoose } = require("mongoose");
const { Category } = require("../model/categories");
const { validateCategory } = require("../validator/validateCategory");
const { Product } = require("../model/products");


const newCategory = async (req, res) => {
    try {
        validateCategory(req)
        const { name, description, categoryImage, } = req.body;

        const existingCategory = await Category.findOne({ name: name });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists.",
            });
        }
        const category = new Category({
            name,
            description,
            categoryImage,
        });
        await category.save();
        res.status(201).json({
            success: true,
            message: "Category created successfully!",
            data: category,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error in creating category.",
            error: "ERROR : " + error.message
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find().select("name , description ,  categoryImage")
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully!",
            totalCategory: allCategories.length,
            data: allCategories,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error in fetching all Categories.",
            error: "ERROR : " + error.message
        });
    }
}

const getCategoryByID = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "_id is required to fetch category"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                status: false,
                message: `Entered Id should be valid: ${_id}`
            })
        }
        const category = await Category.findById(_id)

        res.status(200).json({
            success: true,
            message: "Categories fetched successfully!",
            data: category,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error in fetching Category.",
            error: "ERROR : " + error.message
        });
    }
}

const getAllProductsByCategoryId = async (req, res) => {
    try {
        const { _id } = req.params;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                success: false,
                message: `Entered Id should be valid: ${_id}`
            });
        }

        const category = await Category.findById(_id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const allProducts = await Product.find({ categoryId: _id });
        if (allProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for this category"
            });
        }

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            totalProducts: allProducts.length,
            data: allProducts
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server error",
            error: "ERROR: " + error.message
        });
    }
};

const getAllCategorieswithProduct = async (req, res) => {
    try {
        // Aggregation to fetch categories with total product count
        const allCategories = await Category.aggregate([
            {
                $lookup: {
                    from: "products", // MongoDB collection name for products
                    localField: "_id", // Field in the Category model
                    foreignField: "categoryId", // Field in the Product model
                    as: "products", // Alias for the joined data
                },
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    categoryImage: 1,
                    totalProducts: { $size: "$products" }, // Count of products in each category
                },
            },
        ]);

        // Response with success
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully!",
            totalCategory: allCategories.length,
            data: allCategories,
        });
    } catch (error) {
        // Error handling
        res.status(500).json({
            success: false,
            message: "Error in fetching categories.",
            error: error.message,
        });
    }
};

// should do update, delete 

module.exports = {
    newCategory,
    getAllCategories,
    getCategoryByID,
    getAllProductsByCategoryId,
    getAllCategorieswithProduct
}