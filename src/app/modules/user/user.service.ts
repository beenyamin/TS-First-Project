import httpStatus from 'http-status';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import { User } from './user.model';
import { TStudent } from '../student/student.interface';
import config from '../../config';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';

import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default pass
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester  info

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set auto generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //   create a student

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To create user');
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

 // create a user (transaction-2)
    const newStudent = await Student.create([payload], {session});
    
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To create student');
    }

    await session.commitTransaction()

    await session.endSession()

    return newStudent;
  } catch (err:any) {
     await session.abortTransaction()
     await session.endSession();
     throw new Error (err)
  }
};

export const UserService = {
  createStudentIntoDB,
};
