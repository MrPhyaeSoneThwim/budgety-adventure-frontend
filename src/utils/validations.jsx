import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid").required("required"),
  password: Yup.string().min(6, "min-length").required("required"),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string().email("invalid").required("required"),
  password: Yup.string().min(6, "min-length").required("required"),
  passwordConfirm: Yup.string()
    .min(6, "min-length")
    .required("required")
    .oneOf([Yup.ref("password"), null], "mismatched"),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required.")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
});

export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Password is required.")
    .min(6, "Minimum 6 characters required."),
  password: Yup.string()
    .required("New password is required.")
    .min(6, "Minimum 6 characters required."),
  passwordConfirm: Yup.string()
    .required("Confirm password is required.")
    .min(6, "Minimum 6 characters required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
