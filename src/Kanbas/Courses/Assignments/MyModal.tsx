import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as CourseClient from "../client"

interface MyModalProps {
    modalOpen: boolean;
    aid: string;
    cid: string;
    assignments: Array<any>; // Use a more specific type instead of `any` if possible
    setAssignments: React.Dispatch<React.SetStateAction<Array<any>>>; // State updater function
  }

export default function MyModal({ modalOpen, aid, cid, assignments, setAssignments}: MyModalProps, ) {
    // console.log("aid",aid);
    const [open, setOpen] = React.useState(modalOpen);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        CourseClient.deleteAssignment(cid, aid);
        const updatedAssignments = assignments.filter((assignment) => assignment._id !== aid); // Remove locally
        setAssignments(updatedAssignments);
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