import Button from "@/components/ui/button";
import { Box, SxProps, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { IConsultant } from "@/types";
import PersonIcon from "@mui/icons-material/Person";
import StatusPill from "@/components/ui/status-pill";

const TaxConsultantInfo: FC<{ data: IConsultant; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const theme = useTheme();

  const statusStyle: Record<string, SxProps> = {
    Invited: {
      color: theme.palette.grey[800],
      bgcolor: "transparent",
      borderColor: theme.palette.grey[400],
      border: "1px solid",
    },
    Pending: {
      color: "rgb(245, 156, 66)",
      bgcolor: "rgba(245, 194, 66, 0.2)",
    },
    Approved: {
      color: theme.palette.success.main,
      bgcolor: "#E3F3F0",
    },
  };

  return (
    <Box sx={{ pb: "4.7rem" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          variant="text"
          sx={{ p: 0, minWidth: "fit-content" }}
        >
          <CloseIcon
            sx={{ fontSize: "3rem", color: theme.palette.grey[500] }}
          />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            width: "7.8rem",
            height: "7.8rem",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid",
            borderColor: theme.palette.grey[500],
            bgcolor: theme.palette.grey[200],
          }}
        >
          <PersonIcon
            sx={{
              fontSize: "6rem",
              color: theme.palette.grey[900],
            }}
          />
        </Box>
        <Typography
          component="h4"
          sx={{
            color: theme.palette.grey[800],
            mb: "2.4rem",
            fontSize: "3.4rem",
          }}
        >
          {data.first_name} {data.last_name}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "1.4rem",
                color: theme.palette.grey[400],
                mb: "0.4rem",
              }}
            >
              Email:
            </Typography>
            <Typography
              sx={{ fontSize: "2.2rem", color: theme.palette.grey[800] }}
            >
              {data.email}
            </Typography>
          </Box>
          <Box component="hr" sx={{ width: "100%" }} />
          <Box>
            <Typography
              sx={{
                fontSize: "1.4rem",
                color: theme.palette.grey[400],
                mb: "0.4rem",
              }}
            >
              Phone Number:
            </Typography>
            <Typography
              sx={{ fontSize: "2.2rem", color: theme.palette.grey[800] }}
            >
              {data.phone}
            </Typography>
          </Box>
          <Box component="hr" sx={{ width: "100%" }} />
          <Box>
            <Typography
              sx={{
                fontSize: "1.4rem",
                color: theme.palette.grey[400],
                mb: "0.4rem",
              }}
            >
              Unique Tax ID:
            </Typography>
            <Typography
              sx={{ fontSize: "2.2rem", color: theme.palette.grey[800] }}
            >
              {data.tax_id || "--"}
            </Typography>
          </Box>
          <Box component="hr" sx={{ width: "100%" }} />
          <Box>
            <Typography
              sx={{
                fontSize: "1.4rem",
                color: theme.palette.grey[400],
                mb: "0.4rem",
              }}
            >
              Status:
            </Typography>
            <StatusPill
              sx={{
                fontSize: "1.8rem",
                px: "2.6rem",
                display: "inline-block",
                py: "0.4rem",
                ...statusStyle[data.status],
              }}
            >
              {data.status}
            </StatusPill>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaxConsultantInfo;
