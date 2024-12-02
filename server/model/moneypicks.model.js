const mongoose = require("mongoose");

const moneyPicks = new mongoose.Schema({
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

    }
})

const MoneyPicks = mongoose.model("MoneyPicks", moneyPicks)

module.exports = { MoneyPicks }