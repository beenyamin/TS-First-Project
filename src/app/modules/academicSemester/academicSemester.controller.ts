import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {

  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync (async (req , res) =>{
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester are retrieved successfully',
    data: result,
  });
} )

const getSingleAcademicSemester = catchAsync (async (req , res) => {
  const {semesterId} = req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Semester are retrieved successfully',
    data: result,
  });
})

const updateAcademicSemester = catchAsync (async (req , res) => {
  const {semesterId} = req.params ; 
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId , 
    req.body 
  )


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is Updated  successfully',
    data: result,
  });
})


export const AcademicSemesterController = {
createAcademicSemester,
getAllAcademicSemester,
getSingleAcademicSemester,
updateAcademicSemester
};
