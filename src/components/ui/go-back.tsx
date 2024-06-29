import { FC, ReactNode } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "./button";

const GoBack: FC<{ children?: ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{ color: (theme) => theme.palette.grey[800], fontSize: "2.4rem", px: 0 }}
    >
      <KeyboardBackspaceIcon sx={{ width: "2.4rem", height: "2.4rem", mr: "3.2rem" }} />{" "}
      {children}
    </Button>
  );
};

export default GoBack;
