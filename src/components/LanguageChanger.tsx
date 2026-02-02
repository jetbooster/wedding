import { IconButton } from "@mui/material";
import { GB, FR } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

const LanguageChanger = () => {
  const { i18n } = useTranslation();
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <IconButton onClick={() => i18n.changeLanguage("en")} sx={{ padding: 1 }}>
        <GB height="20px" width="30px" />
      </IconButton>
      <IconButton onClick={() => i18n.changeLanguage("fr")} sx={{ padding: 1 }}>
        <FR height="20px" width="30px" />
      </IconButton>
    </div>
  );
};

export default LanguageChanger;
