import Button from "@/components/ui/button";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Modal from "@/components/features/modals";
import { useState } from "react";

const GenerateTaxCertificate = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  return (
    <Box sx={{ p: "4rem" }}>
      <Typography
        component="h4"
        sx={{
          fontSize: "2.4rem",
          fontWeight: 600,
          color: theme.palette.grey[800],
        }}
      >
        Generate Tax Certificate
      </Typography>
      <Button rounded sx={{ my: "4rem" }} onClick={() => setOpenModal(true)}>
        <DownloadOutlinedIcon sx={{ mr: "0.8rem" }} /> Download TCC
      </Button>
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: 500,
          color: theme.palette.grey[700],
          mb: "1.2rem",
        }}
      >
        You will be eligible to generate your Tax Clearance Certificate is the
        conditions below are met.
      </Typography>
      <Box
        component="ul"
        sx={{ listStyleType: "disc", listStylePosition: "inside" }}
      >
        <Box
          component="li"
          sx={{
            fontSize: "1.6rem",
            color: theme.palette.grey[600],
            lineHeight: "2.9rem",
          }}
        >
          You must ensure you have a profile photo
        </Box>
        <Box
          component="li"
          sx={{
            fontSize: "1.6rem",
            color: theme.palette.grey[600],
            lineHeight: "2.9rem",
          }}
        >
          You must have updated your address (street name, number, state, LGA,
          and LCDA)
        </Box>
        <Box
          component="li"
          sx={{
            fontSize: "1.6rem",
            color: theme.palette.grey[600],
            lineHeight: "2.9rem",
          }}
        >
          You must have filed returns for the past three years
        </Box>
        <Box
          component="li"
          sx={{
            fontSize: "1.6rem",
            color: theme.palette.grey[600],
            lineHeight: "2.9rem",
          }}
        >
          Have individuals returns filed
        </Box>
        <Box
          component="li"
          sx={{
            fontSize: "1.6rem",
            color: theme.palette.grey[600],
            lineHeight: "2.9rem",
          }}
        >
          You must have an assessment raised for the past three years for
          returns filed
        </Box>
        <Box
          component="li"
          sx={{
            fontSize: "1.6rem",
            color: theme.palette.grey[600],
            lineHeight: "2.9rem",
          }}
        >
          You must ensure there are no outstanding bills from assessments raised
        </Box>
      </Box>

      <Modal open={openModal} onClose={closeModal} sx={{ maxWidth: "69.4rem" }}>
        <Typography
          component="h5"
          sx={{
            fontSize: "2rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
          }}
        >
          TCC Compliance Checklist
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.grey[600],
            mt: "1.6rem",
            mb: "2.4rem",
          }}
        >
          Here are some of the items to be completed before you can proceed to
          generate your Tax Certificate.
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#F8F8F8",
                  py: "0.7rem",
                }}
              >
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pl: "6rem",
                    width: "70%",
                  }}
                >
                  Items
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "30%",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ py: "0.7rem" }}>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pl: "6rem",
                    width: "70%",
                  }}
                >
                  Profile Photo
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "30%",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.success.main,
                      fontSize: "1.2rem",
                      p: "0.2rem 1rem",
                      bgcolor: "#E3F3F0",
                      borderRadius: "2rem",
                    }}
                  >
                    Completed
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" gap={0.8} mt="3.2rem">
          <Button rounded variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button rounded>Proceed</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default GenerateTaxCertificate;
