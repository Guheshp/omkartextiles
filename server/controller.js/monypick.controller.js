const { default: mongoose } = require("mongoose");
const { MoneyPicks } = require("../model/moneypicks.model")
const multer = require("multer")
const path = require("path");
const { Product } = require("../model/products");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/moneypick');
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
}).single('categoryImage', 1);

const newMoneyPick = async (req, res) => {
    try {
        const { name, description } = req.body;
        const categoryImage = req.file ? req.file.path : ''

        const existingCategory = await MoneyPicks.findOne({ name: name });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "moneyPicks already exists.",
            });
        }
        const moneyPicks = new MoneyPicks({
            name,
            description,
            categoryImage: categoryImage,
        });
        await moneyPicks.save();
        res.status(201).json({
            success: true,
            message: "moneyPicks created successfully!",
            data: moneyPicks,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error in creating moneyPicks.",
            error: "ERROR : " + error.message
        });
    }
}

const getALlMoneyPick = async (req, res) => {
    try {
        const allMoneyPicks = await MoneyPicks.find()
        res.status(200).json({
            success: true,
            message: "moneypick fetched successfully!",
            data: allMoneyPicks
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while fetching allMoneyPicks",
            error: "ERROR: " + error.message
        })
    }
}

const fetMoneyPickByID = async (req, res) => {
    try {
        const { _id } = req.params;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: `${_id} is required!`,
            })
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                status: false,
                message: `Entered Id should be valid: ${_id}`
            })
        }

        const category = await MoneyPicks.findById(_id)

        res.status(200).json({
            success: true,
            message: "MoneyPicks fetched successfully!",
            data: category,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error in fetching MoneyPicks.",
            error: "ERROR : " + error.message
        });
    }
}

const getAllProductsByMoneyPicks = async (req, res) => {
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

        const category = await MoneyPicks.findById(_id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "MoneyPicks not found"
            });
        }

        const allProducts = await Product.find({ categoryId: _id });
        if (allProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for this MoneyPicks"
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

module.exports = { newMoneyPick, getAllProductsByMoneyPicks, fetMoneyPickByID, upload, getALlMoneyPick }