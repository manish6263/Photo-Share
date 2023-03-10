const Photo = require('../models/Photo');

// Get all photos.........
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({});

        res.status(200).json({
            status: 'success',
            photos
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Get photos by category id.........
exports.getPhotosByCategoryId = async (req, res) => {
    try {
        const photos = await Photo.find({ category: req.params.id });

        res.status(200).json({
            status: 'success',
            photos
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Get photos by publisher id.........
exports.getPhotosByPublisherId = async (req, res) => {
    try {
        const photos = await Photo.find({ publisher: req.params.id });

        res.status(200).json({
            status: 'success',
            photos
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Get photos by id.........
exports.getPhotosById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            photo
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Add photo.........
exports.addPhoto = async (req, res) => {
    try {
        const photo = await Photo.create(req.body);

        res.status(201).json({
            status: 'success',
            photo
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Update photo.........
exports.updatePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByIdAndUpdate(req.params.id, {
            imageUrl: req.body.imageUrl,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            publisher: req.body.publisher,
            publisherName: req.body.name
        }, { new: true });

        res.status(200).json({
            status: 'success',
            photo
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Delete photo..........
exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            photo
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// LIKE SYSTEM........

// Add like......
exports.addLike = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.photoId);
        var isLiked = false;
        const likersArray = [];

        photo.likers.forEach((f) => {
            likersArray.push(f);
            if (f !== null && f.id === req.params.likerId) {
                isLiked = true;
            }
        });

        if (!isLiked) {

            likersArray.push({ 'id': req.params.likerId });
            photo.likers = likersArray;
            photo.likes += 1;
            photo.save();

            res.status(200).json({
                status: 'success',
            });
        } else {
            res.status(400).json({
                status: 'failed',
                message: "You already liked"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Delete like.......
exports.deleteLike = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.photoId);

        photo.likers.forEach((f, index) => {
            if (f !== null && f.id === req.params.likerId) {
                photo.likers[index] = null;
                photo.likes -= 1;
                photo.save();
            }
        });

        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};