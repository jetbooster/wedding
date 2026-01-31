import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface DialogContent {
  message: string;
  isError?: boolean;
}

export const DialogContext = createContext<{
  content: DialogContent | undefined;
  setContent: Dispatch<SetStateAction<DialogContent | undefined>>;
}>({ content: undefined, setContent: () => {} });

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<DialogContent | undefined>();
  return (
    <DialogContext.Provider value={{ content, setContent }}>
      {children}
    </DialogContext.Provider>
  );
};
