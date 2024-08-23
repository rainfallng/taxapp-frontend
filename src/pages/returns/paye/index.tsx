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
import { useNavigate } from "react-router-dom";

const PayeReturns = () => {
  const theme = useTheme();
  const navigate = useNavigate()

  return (
    <Box sx={{ p: "4rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "2.7rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Typography
            component="h3"
            sx={{ fontSize: "2.4rem", fontWeight: 600 }}
          >
            PAYE Returns
          </Typography>
          <Box
            component="select"
            sx={{
              color: "#278F76",
              p: "0.5rem 0.84rem",
              fontWeight: 500,
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </Box>
        </Box>
        <Button rounded onClick={() => navigate("/app/returns/paye/2023")}>File Return</Button>
      </Box>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#E7E7E7",
                  py: "0.7rem",
                }}
              >
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pl: "6rem",
                    width: "40%",
                  }}
                >
                  Month
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
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "30%",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  py: "0.7rem",
                }}
              >
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pl: "6rem",
                    width: "40%",
                  }}
                >
                  April
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "30%",
                  }}
                >
                  Not filed
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
                    component="button"
                    sx={{
                      color: "#278F76",
                      bgcolor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    Click to file return
                  </Box>
                </TableCell>
              </TableRow>
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
                    width: "40%",
                  }}
                >
                  January
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "30%",
                  }}
                >
                  Filed
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
                    component="button"
                    sx={{
                      color: "#278F76",
                      bgcolor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    Click to generate TCC
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PayeReturns;
