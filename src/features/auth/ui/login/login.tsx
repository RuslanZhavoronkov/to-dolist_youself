import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import s from "features/auth/ui/login/login.module.css";
import { useLogin } from "./useLogin";




// type UserType = {
//   name: string
//   age: number
//   isMarried: boolean
//   captcha: string
// }

// type UserType2 = {
//   name: string
//   age: number
//   isMarried: boolean
// }

// type UtilityType = Partial<UserType> //универсальный тип
// type UtilityType1 = Required<UserType>
// type UtilityType2 = Omit<UserType, 'captcha'| 'age'>
// type UtilityType3 = Pick<UserType, 'age' | 'name'>
// type UtilityType4 = Partial<Pick<UserType, 'age' | 'name'>>

// export type TasksStateType1 = {
//   [key: string]: Array<UserType>;
// };

// export type TasksStateType2 = Record <string, UserType>


// const Object = {
//   a1: "a1",
//   b2: 2,
//   c9: true
// }

// type ObjectType = Record<string, unknown>

// function f (a: unknown) {
//   if (typeof a === 'number') {
// return a * 100
//   }
// }



// type FormikErrorType = { //тип приходящих данных в функцию validate формика formik
//   email?: string;
//   password?: string;
//   rememberMe?: boolean;
// };

// export type LoginParamsType = { //для авторизации (для запроса на сервер)
//   email: string;
//   password: string;
//   rememberMe: boolean;
//   captcha?: string;
// };



export const Login = () => {

const {formik} = useLogin()
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                disabled={!(formik.isValid && formik.dirty)}
                color={"primary"}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
