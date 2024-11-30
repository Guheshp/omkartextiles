const newCategory = async (req, res) => {
    try {
        validateCategory(req)
        const { name, description, categoryImage, } = req.body;

        const existingCategory = await MoneyPicks.findOne({ name: name });

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