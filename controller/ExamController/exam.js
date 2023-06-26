const SchoolExame = require("../../model/ExamSchema/exammodel");
const TryCatch = require("../../middelwear/TryCatch");



 // Create a new exam
const createExam = TryCatch(async (req, res) => {
  req.body.schoolId = req.user.schoolId;
  req.body.createdBy = req.user.id;
  const { classId, subject, date, duration, totalMarks, createdBy, schoolId } =
    req.body;
  const exam = await SchoolExame.create({
    classId,
    subject,
    date,
    duration,
    totalMarks,
    schoolId,
    createdBy,
  });
  const add = await SchoolExame.create(exam);
  res.status(201).json({ success: true, add });
});

// Get all exams for a specific class
const ALLSchoolExam = TryCatch(async (req, res) => {

  const schoolId = req.user.schoolId;

  const searchQuery = {
    schoolId,
  };
  const exams = await SchoolExame.find(searchQuery);
  res.json({ exams });
});



// Get all exams for a specific class
const getAllExamsByClass = TryCatch(async (req, res) => {
  const { classId } = req.params;

  const schoolId = req.user.schoolId;

  //   const schoolId = req.user.schoolId;
  const searchQuery = {
    schoolId,
    classId,
  };
  const exams = await SchoolExame.find(searchQuery);
  res.json({ exams });
});

// Get exam by ID
const getExamById = TryCatch(async (req, res) => {
    const { examId } = req.params;

    const exam = await SchoolExame.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    res.json({ exam });
});

// Update exam by ID
const updateExamById = TryCatch(async (req, res) => {
    const { examId } = req.params;

    const exam = await SchoolExame.findByIdAndUpdate(
      examId,
      req.body,
      { new: true }
    );

    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    res.json({success : true , exam });
});

// Delete exam by ID
const deleteExamById = TryCatch(async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findByIdAndRemove(examId);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    res.json({ message: "Exam deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the exam." });
  }
});

// myexam 
const MyExam = TryCatch(async (req, res) => {
  
  const schoolId = req.user.schoolId;
  const classId = req.user.classId;

  //   const schoolId = req.user.schoolId;
  const searchQuery = {
    schoolId,
    classId,
  };
  const exams = await SchoolExame.find(searchQuery);
  res.json({ exams });
});


// schoolExam
const MySchoolsExam = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;

  //   const schoolId = req.user.schoolId;
  const searchQuery = {
    schoolId,
  };
  const exams = await SchoolExame.find(searchQuery);
  res.json({ exams });
});


module.exports = {
  createExam,
  getAllExamsByClass,
  getExamById,
  updateExamById,
  deleteExamById,
  ALLSchoolExam,
  MyExam,
  MySchoolsExam,
};
