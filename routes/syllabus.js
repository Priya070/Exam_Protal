const express = require('express');
// const { body } = require('express-validator');
const router = express.Router();
const Syllabus = require('../schema/Syllabus.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[2];
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


// teacher can add syllabus
router.post('/syllabus', upload.single('fileName'), async (req, res) => {
    
    try {
        // console.log(2)
        console.log(req.body)
        const code = await Syllabus.findOne({ code: req.body.code });
        if (code) {
            // console.log(code)
            return res.status(404).send('Subject code exist');
        } 
        const newSyllabus = await Syllabus({
            code: req.body.code,
            syllabus: req.file.path
        });
        newSyllabus.save();
        console.log(newSyllabus)
        res.send('syllabus added');
    } catch (error) {
        console.log(error)
        res.status(404).send("error h");
    }
});

router.post('/getsyllabus', async (req, res) => {
    try {
        const newcode = await Syllabus.find({ code: req.body.code });
        console.log(path.join(__dirname + "/.." +"//" + newcode[0].syllabus));
        // console.log(path.join(__dirname + "/.." +"//"))
        // res.json(newcode); C:\Users\priya\Downloads\new\uploads
        res.sendFile(path.join(__dirname + "/.."+"//" + newcode[0].syllabus));
        // res.send(newcode);
        // console.log(newcode.code);
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
});

module.exports = router;