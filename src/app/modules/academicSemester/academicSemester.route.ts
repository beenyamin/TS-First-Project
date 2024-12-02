import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';


const router = express.Router()

router.post('/create-academic-semester' ,
    validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
     AcademicSemesterController.createAcademicSemester)


router.get ('/:semesterId' , AcademicSemesterController.getSingleAcademicSemester)

router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
  );

router.get('/', AcademicSemesterController.getAllAcademicSemester);

// router.delete('/:studentId', StudentControllers.deleteStudent);
export const AcademicSemesterRoutes = router ;