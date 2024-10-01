import * as z from "zod";

// REGISTER SCHEMA
export const RegisterSchema = z
  .object({
    username: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores, without spaces",
      )
      .min(1, {
        message: "Username of atleast four characters needed.",
      })
      .max(12, {
        message: "Maximum twelve characters acceptable.",
      }),
    email: z.string().email({
      message: "A valid email is required",
    }),
    password: z.string().min(6, {
      message: "At least 6 characters needed.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

// LOGIN SCHEMA
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Not a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Must be of atleast six characters.",
  }),
});

// ADD FOLDER
export const FolderSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Minimum 2 characters is required.",
    })
    .max(50, {
      message: "Maximum 90 characters are required.",
    }),
  description: z
    .string()
    .min(2, { message: "Minimum 2 characters are needed." })
    .max(140, {
      message: "Maximum 140 characters are allowed.",
    }),
  emoji: z.string(),
});

// ADD QUESTION
export const QuestionSchema = z.object({
  title: z.string().min(2, {
    message: "Minimum two characters are needed in question title.",
  }),
});

// FULL QUESTION QUESTION SCHEMA
export const FullQuestionSchema = z.object({
  title: z.string().min(2, {
    message: "Minimum two characters are needed in question title.",
  }),
  problemStatement: z.string(),
});
