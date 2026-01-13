import * as Yup from "yup";

export const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  gender: Yup.string().required("Gender is required"),
  skills: Yup.array()
    .min(1, "At least one skill must be selected")
    .required("At least one skill must be selected"),
  category: Yup.string().required("Category is required"),
  date: Yup.string().required("Date is required"),
});
