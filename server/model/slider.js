const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title must not exceed 100 characters"],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description must not exceed 500 characters"],
    },
    image: {
        type: [String],
        required: [true, "Image URL is required"],
    },
});

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = Slider;
