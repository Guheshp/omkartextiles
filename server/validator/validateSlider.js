const validator = require('validator');

const validateSlider = (req) => {
    const { title, description } = req.body;

    if (!title || validator.isEmpty(title.trim())) {
        throw new Error("Title is required.");
    }
    if (!validator.isLength(title, { min: 5, max: 100 })) {
        throw new Error("Title must be between 5 and 100 characters.");
    }

    if (!description || validator.isEmpty(description.trim())) {
        throw new Error("Description is required.");
    }
    if (!validator.isLength(description, { min: 10, max: 300 })) {
        throw new Error("Description must be between 10 and 300 characters.");
    }

};

module.exports = { validateSlider };
