import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'Name cannot be more than 20 characters.')
    .nonempty('First name is required.'), // Capitalization validation not included since it's not natively supported in zod
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required.'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required."),
  fatherOccupation: z.string().nonempty("Father's occupation is required."),
  fatherContactNo: z.string().nonempty("Father's contact number is required."),
  motherName: z.string().nonempty("Mother's name is required."),
  motherOccupation: z.string().nonempty("Mother's occupation is required."),
  motherContactNo: z.string().nonempty("Mother's contact number is required."),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required."),
  occupation: z.string().nonempty("Local guardian's occupation is required."),
  contactNo: z
    .string()
    .nonempty("Local guardian's contact number is required."),
  address: z.string().nonempty("Local guardian's address is required."),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'others'], {
        errorMap: () => ({ message: 'Invalid gender value.' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format.')
        .nonempty('Email is required.'),
      contactNo: z.string().nonempty('Contact number is required.'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required.'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().nonempty('Present address is required.'),
      permanentAddress: z.string().nonempty('Permanent address is required.'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});
