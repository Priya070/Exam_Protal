const express = require('express');
const router = express.Router();
const Schedule = require('../schema/Schedule');

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

const upload = multer({
    storage: storage
})

router.post('/schedule', upload.single('schedule'), async (req, res) => {
    try {
        const sem = req.body.sem;
        if (!sem) {
            throw new Error('Semester is required');
        }

        const newschedule = new Schedule({
            sem: req.body.sem,
            schedule: req.file.path
        });
        newschedule.save();
        res.send("schedule uploaded sucessfully");

    } catch (error) {
        console.log(error)
        res.status(404).send("error h");
    }
});

router.get('/getschedule', async (req, res) => {
    try {
        const newfile = await Schedule.find({});
        // console.log(path.join(__dirname + '\\' + newfile[0].schedule));
        // res.json(newcode);
        // if()
        for (let i = 0; i < newfile.length; i++) {
            const element = newfile[i];
            console.log(element.sem)
            if (element.sem === "midsem") return res.sendFile(path.join(__dirname + "/.." + '\\' + element.schedule));
            else return res.sendFile(path.join(__dirname + "/.." + '\\' + element.schedule));
        }
        console.log(newfile);
        res.sendFile(path.join(__dirname + "/.." + '\\' + newfile[0].schedule))
        // res.send(newcode);
        // console.log(newcode.code);
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
})



module.exports = router;