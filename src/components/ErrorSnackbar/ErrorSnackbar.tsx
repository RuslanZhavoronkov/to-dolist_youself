import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { appSetErrorAC } from '../../app/app-reducer';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbars =()=> {
 // const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    //setOpen(false);
    dispatch(appSetErrorAC(null))
  };

  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()
  const isOpen = error !== null
  
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
         <span>{error}</span> 
        </Alert>
      </Snackbar>
    </Stack>
  );
}
