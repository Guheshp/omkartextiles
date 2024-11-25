const validator = require('validator');

const validateCategory = (req) => {

    const { name, description, categoryImage } = req.body;

    if (!name || typeof name !== 'string' || !validator.isLength(validator.trim(name), { min: 3 })) {
        throw new Error('Name must be a string with at least 3 characters.');
    }

    if (!description || typeof description !== 'string' || !validator.isLength(validator.trim(description), { min: 10 })) {
        throw new Error('Description must be a string with at least 10 characters.');
    }

    if (!categoryImage || typeof categoryImage !== 'string' || !validator.isURL(validator.trim(categoryImage))) {
        throw new Error('Category image must be a valid URL.');
    }

    req.body.name = validator.trim(name);
    req.body.description = validator.trim(description);
    req.body.categoryImage = validator.trim(categoryImage);

};

module.exports = { validateCategory };
