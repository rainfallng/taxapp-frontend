import { Box, Typography } from "@mui/material";
import Modal from ".";
import { SyncLoader } from "react-spinners";
import Button from "@/components/ui/button";

const CalculateReturnsModal = ({
  open,
  onClose,
  isLoading,
}: {
  open: boolean;
  onClose?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Modal sx={{ py: "8rem" }} open={open}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3.2rem",
        }}
      >
        <Box
          component="img"
          src="/assets/svgs/calculate.svg"
          alt=""
          sx={{ width: "9.6rem", height: "9.6rem" }}
        />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "2.2rem",
            color: (theme) => theme.palette.grey[800],
            textAlign: "center",
          }}
        >
          {isLoading
            ? "Calculating Tax Implication..."
            : "Calculated Tax Implication"}
        </Typography>
        <SyncLoader size={10} color="#52D0B2" loading={isLoading} />
        <Button rounded onClick={onClose} disabled={isLoading}>
          Continue
        </Button>
      </Box>
    </Modal>
  );
};

export default CalculateReturnsModal;
