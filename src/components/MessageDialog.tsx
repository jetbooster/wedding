import { DialogContext } from "@/context/DialogContext";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

export const MessageDialog = () => {
  const { content, setContent } = useContext(DialogContext);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (content && !open) {
      setOpen(true);
    }
  }, [content]);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setContent(undefined);
    }, 1000);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>{content?.isError ? "Error" : "Success"}</DialogTitle>
      <DialogContent>
        {content?.isError ? (
          <Alert severity="error">{content.message}</Alert>
        ) : (
          <DialogContentText>{content?.message}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Dismiss</Button>
      </DialogActions>
    </Dialog>
  );
};
