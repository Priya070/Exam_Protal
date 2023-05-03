const express = require('express');
const router = express.Router();
const Seating = require('../schema/Seating');

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

// const endsemstorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../uploads/endsemseating')
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[2];
//         cb(null, file.originalname);
//     }
// });
const upload = multer({ storage: storage });


// teacher can add syllabus
router.post('/seating', upload.single('semseating'), async (req, res) => {

    try {
        // console.log(2)
        const sem = req.body.sem;
        // const midsemFile = req.files['midsem'] ? req.files['midsem'][0].path : null;
        // const endsemFile = req.files['endsem'] ? req.files['endsem'][0].path : null;
        // console.log(endsemFile)
        if (!sem) {
            throw new Error('Semester is required');
        }

        const newseating = new Seating({
            sem: req.body.sem,
            seating: req.file.path
        });
        // console.log(sem);
        // console.log(req.files['midsem'])
        // console.log(req.files['endsem'])


        // const midsem = await Seating({
        //     sem: req.body.sem,
        //     seating: req.files['midsem'][0].path
        // });
        // midsem.save();
        // console.log(midsem)
        // res.send('midsemester seating added');

        // const endsem = await Seating({
        //     sem: req.body.sem,
        //     seating: req.files['endsem'][0].path
        // });
        // endsem.save();
        // console.log(endsem)
        // res.send('endsemester seating added');

        console.log("hello");
        // const newSeating = await Seating({
        //     sem: req.body.sem,
        //     seating: req.file.path
        // });
        newseating.save();
        res.send('seating added');
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
});

router.get('/getseating', async (req, res) => {
    try {
        const newfile = await Seating.find({});
        for (let i = 0; i < newfile.length; i++) {
            const element = newfile[i];
            console.log(element.sem)
            if (element.sem === "midsem") return res.sendFile(path.join(__dirname +"/.." + '\\' + element.seating));
            else return res.sendFile(path.join(__dirname +"/.." + '\\' + element.seating));
        }
        console.log(newfile);
        res.sendFile(path.join(__dirname + "/.." +'\\' + newfile[0].seating))
        // res.send(newcode);
        // console.log(newcode.code);
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
})


module.exports = router;