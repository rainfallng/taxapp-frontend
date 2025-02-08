import Button from "@/components/ui/button";
import { Box, Modal, Typography, useTheme } from "@mui/material";

const CrossCheckModal = ({
  open,
  toggle,
  onProceed,
  isLoading,
}: {
  open: boolean;
  toggle: () => void;
  onProceed: () => void;
  isLoading?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={toggle}
      sx={{
        alignSelf: "center",
        justifySelf: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.6rem",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          py: "8rem",
          px: "5.4rem",
          bgcolor: "white",
          maxWidth: "60rem",
          borderRadius: "1.5rem"
        }}
      >
        <Box
          component="img"
          src="/assets/svgs/info-warning-gold.svg"
          alt=""
          sx={{ width: "8.8rem", height: "8.8rem" }}
        />
        <Typography
          variant="h5"
          sx={{
            fontSize: "2.6rem",
            fontWeight: 600,
            color: theme.palette.grey[800],
          }}
        >
          Crosscheck your entries
        </Typography>
        <Typography sx={{ fontSize: "1.6rem", color: theme.palette.grey[500] }}>
          Check all your information before you proceed because you will not be
          able to edit your entries after submitting
        </Typography>
        <Box width="100%" display="flex" justifyContent="center">
          <Button
            variant="outlined"
            rounded
            sx={{ width: "50%", maxWidth: "19.5rem" }}
            onClick={toggle}
          >
            Go back
          </Button>
          <Button
            rounded
            disabled={isLoading}
            sx={{ width: "50%", maxWidth: "19.5rem", ml: "1.6rem" }}
            onClick={onProceed}
          >
            Proceed
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CrossCheckModal;
