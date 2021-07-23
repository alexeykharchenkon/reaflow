import { Button, Dialog, DialogTitle, makeStyles, Popover } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { useState } from "react";

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });
  
export interface DialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

export const DialogComponent = (props: DialogProps) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    return (
        <Popover
            id={"1"}
            open={open}
            onClose={handleClose}
            style={{position: 'absolute', top: '100px', left: '100px'}}
        >
            <Button>Hello</Button>    
        </Popover>
   //   <Dialog 
   //     onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}
  //      
  //      >
  //      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
 //       dfgdfgdfgdfg
  //    </Dialog>
    );
  }