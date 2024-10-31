import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

interface MyModalProps {
    modalOpen: boolean;
    aid: String;
  }

export default function MyModal({ modalOpen, aid}: MyModalProps) {
    // console.log("aid",aid);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(modalOpen);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteAssignment(aid));
        setOpen(false);
    }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to remove the assignment?
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Cancel</Button>
          <Button onClick={handleDelete} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}