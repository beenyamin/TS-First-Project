import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';


const createAcademicFaculty = catchAsync(async (req, res) => {

  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync (async (req , res) =>{
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty are retrieved successfully',
    data: result,
  });
} )

const getSingleAcademicFaculty = catchAsync (async (req , res) => {
  const {facultyId} = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFacultiesFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Faculty are retrieved successfully',
    data: result,
  });
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is updated successfully',
      data: result,
    });
  });


export const AcademicFacultyController = {
createAcademicFaculty: createAcademicFaculty,
getAllAcademicFaculty,
getSingleAcademicFaculty,
updateAcademicFaculty
};
