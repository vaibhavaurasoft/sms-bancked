const SchoolExam = require("../../model/ExamSchema/exammodel"); // SchoolExam model
const TryCatch = require("../../middleware/TryCatch"); // TryCatch middleware

// Create a new exam
const createExam = TryCatch(async (req, res) => {
  req.body.schoolId = req.user.schoolId;
  req.body.createdBy = req.user.id;
  const { classId, subject, date, duration, totalMarks, createdBy, schoolId } =
    req.body;
  const exam = await SchoolExam.create({
    classId,
    subject,
    date,
    duration,
    totalMarks,
    schoolId,
    createdBy,
  });
  const add = await SchoolExam.create(exam);
  res.status(201).json({ success: true, add });
});

// Get all exams for a specific class
const getAllExams = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const searchQuery = {
    schoolId,
  };
  const exams = await SchoolExam.find(searchQuery);
  res.json({ exams });
});

// Get all exams for a specific class
const getAllExamsByClass = TryCatch(async (req, res) => {
  const { classId } = req.params;
  const schoolId = req.user.schoolId;
  const searchQuery = {
    schoolId,
    classId,
  };
  const exams = await SchoolExam.find(searchQuery);
  res.json({ exams });
});

// Get exam by ID
const getExamById = TryCatch(async (req, res) => {
  const { examId } = req.params;
  const exam = await SchoolExam.findById(examId);

  if (!exam) {
    return res.status(404).json({ error: "Exam not found." });
  }

  res.json({ exam });
});

// Update exam by ID
const updateExamById = TryCatch(async (req, res) => {
  const { examId } = req.params;
  const exam = await SchoolExam.findByIdAndUpdate(examId, req.body, {
    new: true,
  });

  if (!exam) {
    return res.status(404).json({ error: "Exam not found." });
  }

  res.json({ success: true, exam });
});

// Delete exam by ID
const deleteExamById = TryCatch(async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await SchoolExam.findByIdAndRemove(examId);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }

    res.json({ message: "Exam deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the exam." });
  }
});

// My exams
const MyExams = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const classId = req.user.classId;
  const searchQuery = {
    schoolId,
    classId,
  };
  const exams = await SchoolExam.find(searchQuery);
  res.json({ exams });
});

// School exams
const MySchoolExams = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const searchQuery = {
    schoolId,
  };
  const exams = await SchoolExam.find(searchQuery);
  res.json({ exams });
});

module.exports = {
  createExam,
  getAllExams,
  getAllExamsByClass,
  getExamById,
  updateExamById,
  deleteExamById,
  MyExams,
  MySchoolExams,
};
