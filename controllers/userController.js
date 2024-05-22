const path = require('path');
const User = require('../models/User');

exports.getHome = async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { users });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.uploadPhoto = async (req, res) => {
    const { fname, lname, pnumber, email, DOB } = req.body;    let uploadedFile;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    uploadedFile = req.files.photo;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', uploadedFile.name);

    uploadedFile.mv(uploadPath, async (err) => {
        if (err) return res.status(500).send(err);

        try {
            const newUser = new User({
                fname,
                lname,
                pnumber,
                email,
                DOB,
                photoPath: `/uploads/${uploadedFile.name}`
            });
            await newUser.save();
            res.redirect('/');
        } catch (err) {
            res.status(500).send('Server Error');
        }
    });
};
