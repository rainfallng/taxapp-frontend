import { PREVIOUS_YEARS } from "@/lib/constants";
import {
  Box,
  Button,
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

const PersonalIncomeTax = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: "4rem" }}>
      <Typography
        component="h3"
        sx={{ fontSize: "2.4rem", fontWeight: 600, mb: "3rem" }}
      >
        Personal Income Tax
      </Typography>

      <TableContainer sx={{ mt: "4rem" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#E7E7E7",
              }}
            >
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: "40%",
                }}
              >
                Year
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: "40%",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: "20%",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PREVIOUS_YEARS.map((y, key) => (
              <TableRow
                key={y}
                sx={{
                  ...(key % 2 !== 0 && { bgcolor: "rgba(231, 231, 231, 0.4)" }),
                }}
              >
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "40%",
                  }}
                >
                  {y}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "40%",
                  }}
                >
                  Not Filed
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "20%",
                  }}
                >
                  <Button
                    onClick={() =>
                      navigate(`/app/returns/personal-income-tax?year=${y}`)
                    }
                  >
                    Click to file return
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PersonalIncomeTax;
