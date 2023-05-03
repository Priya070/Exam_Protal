const express = require("express");
const router = express.Router();
const User = require("../schema/User.js");
const Result = require("../schema/Result.js");

const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
// const { log } = require("console");
const p = path.join(__dirname + "/uploads")
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/");
    cb(null, file.originalname);
  },
});
// define the file filter for Excel sheets
const excelFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  if (ext !== "xlsx" && ext !== "xls") {
    return cb(new Error("Only Excel sheets are allowed"));
  }
  cb(null, true);
};

// set up the multer middleware with the storage and file filter
const upload = multer({ storage: storage, fileFilter: excelFilter });

// define the route for handling file uploads
// router.post("/teacherUploadResult", upload.single("result"), (req, res) => {
//   // read the uploaded Excel sheet and do something with the data
//   const workbook = xlsx.readFile(req.file.path);
//   const result = workbook.SheetNames[0]; // assuming you want to read the first sheet
//   const worksheet = workbook.Sheets[result];
//   const json = xlsx.utils.sheet_to_json(worksheet);

//   // do something with the JSON data, e.g. save it to a database
//   const newResult = Result({
//     grades: json,
//   });
//   newResult.save();
//   console.log(json);

//   res.send("File uploaded successfully");
// });


// bodyParser.json();
// upload result is for uploading excel json data of students for each subject by professor
router.post("/UploadResult", async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    data.map((student) => {
      Result.findOne({ roll_no: student["Roll no."] }).then((found) => {
        const temp = { ...student };
        delete temp["Name"];
        delete temp["Roll no."];
        if (!found) {
          const newStudent = new Result({
            name: student["Name"],
            roll_no: student["Roll no."],
            subjects: temp,
          });
          newStudent.save();
        } else {
          var newSubjects = Object.assign(found["subjects"], temp);
          console.log(newSubjects);
          Result.updateOne(
            { roll_no: student["Roll no."] },
            {
              subjects: newSubjects,
            }
          );
        }
      });
    });
    res.status(200).send("Uploaded Successfully");
  } catch (err) {
    res.status(404).send(err);
  }
});

//get result is for displaying data of all students in the below form to show data on admin dashboard

// {
//         "_id": "644e3aaa540bde6612dbec35",
//         "name": "Priya Yadav",
//         "roll_no": "LCS2020055",
//         "subjects": {
//             "BLOC32": "C",
//             "IVP33": "C",
//             "TW034": "C"
//         },
//         "__v": 0
//     },
router.get("/getResult", async (req, res) => {
  try {
    // const { name, rollNo, code } = req.body;
    const studentResult = await Result.find();

    console.log(studentResult);
    if (studentResult) console.log("sucess");
    else console.log("failure");

    // console.log(student);
    res.json(studentResult);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Publish result is for publishing  result for each student into student user collection database

router.post("/publishResult", async (req, res) => {
  try {
    Result.find().then((data) => {
      // const student = data[0];
      // console.log(data[0])
      data.map((student) => {
        console.log(student.name);
        User.findOneAndUpdate(
          { username: student.name },
          {
            result: student.subjects,
          }
        )
          .then((result) => console.log(result));
      });

    });
    res.status(200).send("Published results");
  } catch (error) {
    res.status(404).send(error);
  }
});

// student result route is for getting result of each student by passing their rollno it will also give their cgpa if results are not published it will give empty object

router.post("/studentResult", async (req, res) => {
  const username = req.body.username;
  // console.log(username);
  const gradeToNumber = {
    "A+": 10,
    A: 9,
    "B+": 8,
    B: 7,
    C: 6,
    D: 5,
    F: 0,
  };
  try {
    // const { name, rollNo, code } = req.body;
    const studentResult = await User.find({ username: username });
    console.log(studentResult)
    console.log(studentResult[0].result);
    const grades = studentResult[0].result;
    let totalGradePoints = 0;
    let count = 0;
    for (const subject in grades) {
      if (grades.hasOwnProperty(subject)) {
        const grade = grades[subject];
        count++;
        totalGradePoints += gradeToNumber[grade];
      }
    }
    if (count > 0) {
      const cgpa = totalGradePoints / count;
      console.log("grade points", cgpa);

      const result = { ...grades, cgpa: cgpa };
      console.log("its grades", result);
      // console.log(student);
      res.json(result);
    }
    else {
      res.status(404).send("No grades found for student");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
