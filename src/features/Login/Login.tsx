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

 type FormikErrorType = {
        email?: string
        password?: string
        //rememberMe?: boolean
    }

export const Login = () => {
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password:'',
      rememberMe: false,
    },
    validate: (values) => {
            const errors: FormikErrorType = {}
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  //const response = Object.values(formik.errors)
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
            name="email"
            onChange = {formik.handleChange} //change data form
            value={formik.values.email}
            />
            {formik.errors.email && <span style={{color:'red'}}>{formik.errors.email}</span>}
            <TextField
            type="password"
            label="Password"
            margin="normal"
            name="password" 
            onChange = {formik.handleChange} //change data form
            />
            <span>{formik.errors.password}</span>
            <FormControlLabel
            label={"Remember me"}
            control={<Checkbox
                 name={"rememberMe"}
                 onChange = {formik.handleChange}/>} //change data form
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
