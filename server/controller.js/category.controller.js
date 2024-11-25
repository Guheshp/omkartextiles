const { default: mongoose } = require("mongoose");
const { Category } = require("../model/categories");
const { validateCategory } = require("../validator/validateCategory");


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

// should do update, delete 

module.exports = {
    newCategory,
    getAllCategories,
    getCategoryByID
}