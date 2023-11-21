import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { loginTC } from "./auth-reducer";
import { Navigate } from "react-router-dom";

type FormikErrorType = {
  email?: string;
  password?: string;
  //rememberMe?: boolean
};

export type LoginDataType = {
email:string
password: string
rememberMe: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!values.email) {
        errors.email = "Required";
      } else if (!regex.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if(values.password.length < 5) {
        errors.password = "Should be more five symbols"
      }
      return errors;
    },
    onSubmit: (values) => {
     dispatch(loginTC(values))
     console.log(values)
      formik.resetForm();
    },
  });
  //const response = Object.values(formik.errors)
  //console.log(formik.touched)

  if (isLoggedIn) {
   return  <Navigate to={'/'}/>
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
              >
                {" "}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
                // name="email"
                // onChange={formik.handleChange} //change data form
                // value={formik.values.email}
                // onBlur={formik.handleBlur} //visited fields
              />
              {formik.touched.email && formik.errors.email && (
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
                // name="password"
                // onChange={formik.handleChange} //change data form
                // value={formik.values.password}
                // onBlur={formik.handleBlur} ////visited fields    
              />
              {formik.touched.password && formik.errors.password && (
                <span style={{ color: "red" }}>{formik.errors.password}</span>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    // name={"rememberMe"}
                    // onChange={formik.handleChange}  
                  />
                } //change data form
                value={formik.values.rememberMe}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};
