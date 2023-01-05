import { useFormik } from "formik";
import axios from "axios";
import styles from "./Form.module.scss";
import Swal from "sweetalert2";

interface MyFormValues {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
}

const validate = (values: MyFormValues) => {
  const errors: { [key: string]: string } = {};

  if (!values.question) {
    errors.question = "Question is required";
  }

  if (!values.optionA) {
    errors.optionA = "Entry for Option-A is required";
  }

  if (!values.optionB) {
    errors.optionB = "Entry for Option-B is required";
  }

  if (!values.optionC) {
    errors.optionC = "Entry for Option-C is required";
  }

  if (!values.optionD) {
    errors.optionD = "Entry for Option-D is required";
  }
  if (!values.answer) {
    errors.answer = "A valid answer to the above question is required";
  }

  return errors;
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function Form() {
  const formik = useFormik({
    initialValues: {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
    },
    validate,
    onSubmit: async (values) => {
      let data = {
        question: values.question,
        options: {
          A: values.optionA,
          B: values.optionB,
          C: values.optionC,
          D: values.optionD,
        },
        answer: values.answer,
      };

      let req = await axios.post("/api/hello", data);
      if (req.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Entry added successfully",
        });
        formik.resetForm();
      } else {
        let timerInterval: number;
        Swal.fire({
          title: "Oops!!!",
          html: "Kindly contact admin regards this issue",
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
    },
  });

  return (
    <form className={styles.Form} onSubmit={formik.handleSubmit}>
      <h2>Upload a Question</h2>
      <div>
        <label>Question</label>
        <textarea
          id="question"
          name="question"
          rows={5}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.question}
        ></textarea>
        {formik.touched.question && formik.errors.question && (
          <span className={styles.errorMessage}>{formik.errors.question}</span>
        )}
      </div>
      <div>
        <label>Option - A</label>
        <textarea
          id="optionA"
          name="optionA"
          rows={2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.optionA}
        ></textarea>
        {formik.touched.optionA && formik.errors.optionA && (
          <span className={styles.errorMessage}>{formik.errors.optionA}</span>
        )}
      </div>
      <div>
        <label>Option - B</label>
        <textarea
          id="optionB"
          name="optionB"
          rows={2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.optionB}
        ></textarea>
        {formik.touched.optionB && formik.errors.optionB && (
          <span className={styles.errorMessage}>{formik.errors.optionB}</span>
        )}
      </div>
      <div>
        <label>Option - C</label>
        <textarea
          id="optionC"
          name="optionC"
          rows={2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.optionC}
        ></textarea>
        {formik.touched.optionC && formik.errors.optionC && (
          <span className={styles.errorMessage}>{formik.errors.optionC}</span>
        )}
      </div>
      <div>
        <label>Option - D</label>
        <textarea
          id="optionD"
          name="optionD"
          rows={2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.optionD}
        ></textarea>
        {formik.touched.optionD && formik.errors.optionD && (
          <span className={styles.errorMessage}>{formik.errors.optionD}</span>
        )}
      </div>
      <div>
        <label>Correct Option</label>
        <select
          id="answer"
          name="answer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.answer}
        >
          <option value="" hidden>
            Choose the correct option
          </option>
          <option value={"A"}>Option - A</option>
          <option value={"B"}>Option - B</option>
          <option value={"C"}>Option - C</option>
          <option value={"D"}>Option - D</option>
        </select>
        {formik.touched.answer && formik.errors.answer && (
          <span className={styles.errorMessage}>{formik.errors.answer}</span>
        )}
      </div>
      <button type="submit" disabled={!formik.isValid}>
        {" "}
        Submit Entry
      </button>
    </form>
  );
}
