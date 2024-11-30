const Slider = require("../model/slider")
const multer = require("multer")
const path = require("path");
const { validateSlider } = require("../validator/validateSlider");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/sliderimage');
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
}).array('image', 3);

const createSlider = async (req, res) => {
    try {
        validateSlider(req)
        const { title, description } = req.body;
        const image = req.files ? req.files.map((file) => file.path) : [];

        const sliderData = await new Slider({
            title, description, image
        })

        await sliderData.save()

        res.status(200).json({
            success: true,
            message: "slider created successfully!",
            data: sliderData
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while createing slider data",
            error: "ERROR " + error.message
        });
    }
}

const getSlider = async (req, res) => {
    try {
        const slider = await Slider.find()

        res.status(200).json({
            success: true,
            message: "All slider fetched successfully!",
            data: slider
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching slider",
            error: "ERROR: " + error.message
        });
    }
};

module.exports = {
    createSlider, upload, getSlider
}