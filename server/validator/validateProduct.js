const validator = require('validator');

const validateProduct = (req) => {
    const { categoryId, name, description, price, images, fabricType, stock } = req.body;

    if (!categoryId || !validator.isMongoId(categoryId)) {
        throw new Error('Invalid or missing categoryId. It must be a valid MongoDB ObjectId.');
    }

    if (!name || !validator.isLength(name.trim(), { min: 3, max: 100 })) {
        throw new Error('Product name must be a string between 3 and 100 characters.');
    }

    if (description && !validator.isLength(description.trim(), { max: 1000 })) {
        throw new Error('Description cannot exceed 1000 characters.');
    }

    if (price === undefined || price === null || !validator.isNumeric(price.toString()) || Number(price) < 0) {
        throw new Error('Price must be a positive number or zero.');
    }

    if (!Array.isArray(images) || images.length === 0) {
        throw new Error('Images must be an array with at least one image object.');
    }
    images.forEach((image, index) => {
        if (!image.url || !validator.isURL(image.url.trim())) {
            throw new Error(`Image at index ${index} must have a valid URL.`);
        }
        if (image.altText && !validator.isLength(image.altText.trim(), { max: 100 })) {
            throw new Error(`Alt text at index ${index} cannot exceed 100 characters.`);
        }
    });

    if (fabricType && !validator.isLength(fabricType.trim(), { max: 50 })) {
        throw new Error('Fabric type cannot exceed 50 characters.');
    }

    if (stock === undefined || stock === null || !validator.isInt(stock.toString(), { min: 0 })) {
        throw new Error('Stock must be a non-negative integer.');
    }

    return {
        categoryId: categoryId.trim(),
        name: name.trim(),
        description: description ? description.trim() : undefined,
        price: parseFloat(price),
        images: images.map((image) => ({
            url: image.url.trim(),
            altText: image.altText ? image.altText.trim() : undefined,
        })),
        fabricType: fabricType ? fabricType.trim() : undefined,
        stock: parseInt(stock),
    };
};

module.exports = { validateProduct }
