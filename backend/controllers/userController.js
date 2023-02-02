const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Create a new user.........
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            newUser
        });
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            error: 'This email is already in use',
        });
    }
};

// Login user.......
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (user) {
            const passwordMatch = bcrypt.compare(req.body.password, user.password);
            // console.log(passwordMatch);
            if (passwordMatch) {
                const currentUser = user;
                res.status(200).json({
                    status: 'success',
                    currentUser
                });
            } else {
                res.status(200).json({
                    status: 'failed',
                    error: 'Wrong email or password'
                });
            }
        } else {
            res.status(200).json({
                status: 'failed',
                error: 'Wrong email or password'
            });
        }
    } catch (error) {

        res.status(404).json({
            status: 'failed',
            error
        });
    }
};

// Get all registered user.......
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        res.status(200).json({
            status: 'success',
            users,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Get a particular user by their id....
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Set profile photo.......
exports.setProfilePhoto = async (req, res) => {
    try {
        const profilePhoto = await User.findByIdAndUpdate(req.params.id, {
            imageUrl: req.body.imageUrl
        }, { new: true });

        res.status(200).json({
            status: 'success',
            profilePhoto
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// Add follower......
exports.addFollower = async (req, res) => {
    try {
        const follower = await User.findById(req.params.followerId);
        const followed = await User.findById(req.params.followedId);

        let isFreiend = false;
        const followingsArray = [];
        follower.followings.forEach((f) => {
            followingsArray.push(f);
            if (f !== null && f.id === req.params.followedId) {
                isFreiend = true;
            }
        })
        if (!isFreiend) {
            followingsArray.push({ 'id': req.params.followedId });
            follower.followings = followingsArray;
            followed.followers += 1;
            follower.save();
            followed.save();

            res.status(201).json({
                status: 'success'
            });
        } else {
            res.status(200).json({
                status: 'failed',
                message: "You are already friend"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
}

// Delete follower......
exports.deleteFollower = async (req, res) => {
    try {
        const follower = await User.findById(req.params.followerId);
        const followed = await User.findById(req.params.followedId);
        follower.followings.forEach((f, index) => {
            if (f !== null && f.id === req.params.followedId) {
                follower.followings -= 1;
                followed.save();
                follower.save();
            }
        });
        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
};