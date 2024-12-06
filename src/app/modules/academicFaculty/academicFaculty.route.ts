import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';



const router = express.Router()

router.post('/create-academic-faculty' ,
    validateRequest(AcademicFacultyValidations.createAcademicFacultyValidationSchema),
     AcademicFacultyController.createAcademicFaculty)


router.get ('/:facultyId' , AcademicFacultyController.getSingleAcademicFaculty)

router.patch(
    '/:facultyId',
    validateRequest(
      AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyController.updateAcademicFaculty,
  );

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

// router.delete('/:studentId', StudentControllers.deleteStudent);
export const AcademicFacultyRoutes = router ;