import { Box, Modal as MUIModal, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";

const Modal: FC<{
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  sx?: SxProps;
}> = ({ open, onClose, children, sx }) => {
  return (
    <MUIModal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "white",
          position: "absolute",
          width: "100%",
          maxWidth: "57.9rem",
          borderRadius: "0.5rem",
          p: "4rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          ...sx,
        }}
      >
        {children}
      </Box>
    </MUIModal>
  );
};

export default Modal;
