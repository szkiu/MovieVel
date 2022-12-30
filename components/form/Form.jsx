import { useRouter } from "next/router";
import { Formik, ErrorMessage, Field, Form } from "formik";

const validateName = (value) => {
  let errorMessage;
  if (!value) {
    errorMessage = "Write a Name";
  } else if (value.length > 16 || value.length < 4) {
    errorMessage = "Short Name, Write other";
  }
  return errorMessage;
};

const validatePassword = (value) => {
  let errorMessage;
  if (!value) {
    errorMessage = "Write a Password";
  } else if (value.length > 256 || value.length < 4) {
    errorMessage = "Short Password, Write other";
  }
  return errorMessage;
};

const FormJsx = () => {
  const router = useRouter();
  
  return (
    <Formik
      initialValues={{ password: "", username: "" }}
      onSubmit={(values, actions) =>
        setTimeout(() => {
          actions.resetForm();
          window.localStorage.setItem(
            "account",
            JSON.stringify({
              username: values.username,
              password: values.password,
            })
          );
          window.localStorage.setItem("favorites", JSON.stringify([]));
          router.push("/");
        }, 1000)
      }
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field
              validate={validateName}
              id="username"
              name="username"
              autocomplete="off"
            />
            <ErrorMessage
              name="username"
              className="error-input"
              component="div"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field
              validate={validatePassword}
              id="password"
              name="password"
              type="password"
              autocomplete="off"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-input"
            />
          </div>

          <input type="submit" value="Log In" />
        </Form>
      )}
    </Formik>
  );
};

export default FormJsx;
