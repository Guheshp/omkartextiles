const mongoose = require("mongoose");
const validator = require("validator")

const productSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product must belong to a category"]
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Product name must be at least 3 characters"],
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"]
    },
    images: [
        {
            url: {
                type: String,
                required: [true, "Image URL is required"],
            },
            altText: {
                type: String,
                trim: true,
                maxlength: [100, "Alt text cannot exceed 100 characters"]
            }
        }
    ],

    fabricType: {
        type: String,
        trim: true,
        maxlength: [50, "Fabric type cannot exceed 50 characters"]
    },
    discount: {
        type: Number,
        min: [0, "Stock cannot be negative"],
        default: 0
    },
    newArrival: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
