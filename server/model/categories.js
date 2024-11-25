const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        minlength: [3, "Category name must be at least 3 characters"],
        maxlength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    categoryImage: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Please provide a valid URL for the category image: " + value)
            }
        }
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
