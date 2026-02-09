import { ChildMealChoice } from "@/types";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ChildAttendingBlock {
  childIndex: number;
  childMealChoice: ChildMealChoice;
  handleMealChange: (index: number, mealChoice: ChildMealChoice) => void;
}

const ChildAttendingBlock: FC<ChildAttendingBlock> = ({
  childIndex,
  childMealChoice,
  handleMealChange,
}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "childAttendingBlock" });
  return (
    <div
      style={{
        border: "1px solid #aaa",
        borderRadius: "4px",
        padding: "10px 10px ",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <FormControl fullWidth>
        <Typography sx={{ textAlign: "left" }}>
          {t("childName", { count: childIndex + 1 })}
        </Typography>
        <OutlinedInput
          fullWidth
          id={`childName${childIndex}`}
          defaultValue={name}
          onChange={(e) => {
            handleMealChange(childIndex, {
              ...childMealChoice,
              name: e.target.value,
            });
          }}
          sx={{ backgroundColor: "#ffffe6" }}
        />
      </FormControl>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label={t("highchair")}
          onChange={(_, checked) => {
            handleMealChange(childIndex, {
              ...childMealChoice,
              needsHighChair: checked,
            });
          }}
        />
      </FormGroup>
      <RadioGroup
        defaultValue="false"
        onChange={(event) => {
          handleMealChange(childIndex, {
            ...childMealChoice,
            bringOwnFood: event.target.value === "true",
          });
        }}
        sx={{
          marginLeft: "2rem",
        }}
      >
        <FormControlLabel
          value="false"
          control={<Radio />}
          label={t("description")}
        />
        <FormControlLabel
          value="true"
          control={<Radio />}
          label={t("bringOwnFood")}
        />
      </RadioGroup>
    </div>
  );
};

export default ChildAttendingBlock;
