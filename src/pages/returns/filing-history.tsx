import Button from "@/components/ui/button";
import GoBack from "@/components/ui/go-back";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const FilingHistory = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>Filing History</GoBack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Box>
          <Button rounded onClick={() => navigate("/app/returns/annual")}>
            New Filing
          </Button>
        </Box>
      </Box>
      <TableContainer sx={{ mt: "4rem" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50], px: "3.2rem" }}>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "30%" }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "25%" }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "25%" }}
              >
                Reference No
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "20%" }}
              >
                Uploaded File
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "30%" }}
              >
                10/04/2023
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "25%" }}
              >
                ₦100,000.00
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "25%" }}
              >
                26542736
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "20%" }}
              >
                <Button variant="text" sx={{ color: theme.palette.grey[800], p: 0 }}>
                  Statement of Income{" "}
                  <DownloadOutlinedIcon color="success" sx={{ ml: "1.6rem" }} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FilingHistory;
