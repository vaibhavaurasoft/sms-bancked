const express = require("express");
const router = express.Router();
const ExamController = require("../../controller/ExamController/exam")
const auth = require("../../middelwear/Auth")

// Routes for exams
router.route("/addexam").post( auth.isAuthenticateUser, ExamController.createExam);
router
  .route("/allexams")
  .get(auth.isAuthenticateUser, ExamController.ALLSchoolExam);
router
  .route("/allexams/:classId")
  .get(auth.isAuthenticateUser, ExamController.getAllExamsByClass);
router
  .route("/examdetails/:examId")
  .get(auth.isAuthenticateUser, ExamController.getExamById);
router
  .route("/examupdate/:examId")
  .put(auth.isAuthenticateUser, ExamController.updateExamById);
router
  .route("/examdelete/:examId")
  .delete(auth.isAuthenticateUser, ExamController.deleteExamById);
router
  .route("/myexam")
  .get(auth.isAuthenticateUser, ExamController.MyExam);
  router
  .route("/myschoolexam")
  .get(auth.isAuthenticateUser,auth.authorizeRole("admin","teacher") ,ExamController.MySchoolsExam);


module.exports = router;