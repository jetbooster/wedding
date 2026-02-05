import { DialogContent, DialogContext } from "@/context/DialogContext";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const MessageDialog = () => {
  const { content, setContent } = useContext(DialogContext);
  const { t } = useTranslation(undefined, { keyPrefix: "common" });
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
  if (!content) {
    return null;
  }

  const body = ({ message, messageAdditional, isError }: DialogContent) => {
    if (isError) {
      return (
        <Alert severity="error">
          {message}{" "}
          {messageAdditional && messageAdditional.length > 0 && (
            <>{messageAdditional.map((msg) => msg)}</>
          )}
        </Alert>
      );
    }
    if (!messageAdditional) {
      return <DialogContentText>{message}</DialogContentText>;
    }
    return [
      <DialogContentText key={message}>{message}</DialogContentText>,
      ...messageAdditional.map((msg) => (
        <DialogContentText key={msg}>{msg}</DialogContentText>
      )),
    ];
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{content.header}</DialogTitle>
      <MuiDialogContent>{body(content)}</MuiDialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("button.back")}</Button>
      </DialogActions>
    </Dialog>
  );
};
