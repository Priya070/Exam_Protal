const express = require('express');
const router = express.Router();
const Backpaper = require('../schema/Backpaper.js');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/');
        cb(null, file.originalname);
    }
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === "pdf") {
        cb(null, true);
    }
    else cb(new Error("no pdf file uploaded"), false);
}
const upload = multer({ storage: storage, fileFilter: multerFilter });

// const { body, validationResult } = require('express-validator');

router.post('/register', upload.single('receipt'), async (req, res) => {
    try {

        const alreadyexist = await Backpaper.findOne({ rollNo: req.body.rollNo, code: req.body.code });

        if (alreadyexist) {
            return res.status(403).json("You already submit for this subject backpaper");
        }
        const newStudent = await Backpaper({
            name: req.body.name,
            rollNo: req.body.rollNo,
            code: req.body.code,
            receipt: req.file.path
        });
        newStudent.save();
        // console.log(newStudent)
        console.log("your name is added to the list");

        res.send("student name who have backpaper are registered");

    } catch (error) {
        console.log(error);
        res.status(404).send("error h");
    }
});


router.get('/getStudent', async (req, res) => {
    try {
        // const { name, rollNo, code } = req.body;
        const student = await Backpaper.find({});
        
        console.log(student);
        if (student) console.log("sucess");
        else console.log('failure');

        // console.log(student);
        res.send(student);

    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})



module.exports = router;