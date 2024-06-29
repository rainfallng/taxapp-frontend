import Button from "@/components/ui/button";
import StatusPill from "@/components/ui/status-pill";
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
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Modal from "@/components/features/modals";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { FileUpload } from "@/components/ui/file-upload";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";

const Payroll = () => {
  const theme = useTheme();
  const [addUser, setAddUser] = useState<"payroll" | null>(null);

  return (
    <>
      <Box
        sx={{
          mb: "1.8rem",
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            color: theme.palette.grey[900],
          }}
        >
          Payroll
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          px: "1.45rem",
          py: "3.2rem",
          borderRadius: "1rem",
          minHeight: "52.9rem",
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <Button
            rounded
            variant="outlined"
            onClick={() => setAddUser("payroll")}
          >
            Upload Payroll
          </Button>
        </Box>
        <TableContainer sx={{ mt: "4rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Employee Type
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  12/04/2024
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  <StatusPill>Active</StatusPill>
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  Contract
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  <Button variant="text" sx={{ px: 0 }}>
                    <RemoveRedEyeOutlinedIcon sx={{ mr: "0.8rem" }} />
                    Payroll Listing
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={Boolean(addUser)} onClose={() => setAddUser(null)}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            color: theme.palette.grey[800],
            fontWeight: 600,
            fontSize: "2rem",
            mb: "3.2rem",
          }}
        >
          Add New Address
        </Typography>
        <Button
          rounded
          fullWidth
          sx={{ fontSize: "1.8rem", py: "1.45rem", bgcolor: "#F37D60" }}
        >
          <DownloadOutlinedIcon sx={{ mr: "0.8rem" }} /> Download Template
        </Button>
        <Typography
          sx={{
            mt: "2.4rem",
            mb: "1rem",
            fontSize: "1.6rem",
            lineHeight: "2.9rem",
          }}
        >
          Upon successful filling of the payroll template, you can upload the
          file with the button below to capture the payroll data
        </Typography>
        <FileUpload>
          <Box sx={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
            <Box
              width="100%"
              sx={{
                maxWidth: "19.8rem",
                p: "1rem 3.35rem",
                color: "#278F76",
                bgcolor: "#F8F8F8",
                borderRadius: "5rem",
                border: "1px solid",
                borderColor: theme.palette.grey[100],
                fontSize: "1.8rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              <UploadOutlinedIcon sx={{ mr: "0.3rem", fontSize: "2rem" }} />{" "}
              Upload File
            </Box>
            <Typography sx={{ color: "#717171", fontSize: "1.6rem" }}>
              No file chosen
            </Typography>
          </Box>
        </FileUpload>
        <Box component="hr" sx={{ bgcolor: "#E7E7E7" }} />
        <Box display="flex" justifyContent="flex-end" gap={0.8} mt="2.4rem">
          <Button rounded variant="outlined" onClick={() => setAddUser(null)}>
            Cancel
          </Button>
          <Button rounded>Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Payroll;
