import Button from "@/components/ui/button";
import { MONTH_INDEX_MAPPER } from "@/lib/constants";
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
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const MonthlyPaye = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [year, setYear] = useState("2024");
  const month = dayjs().month();
  const prevMonth = month === 0 ? 11 : month - 1;

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
            value={year}
            onChange={({ target: { value } }) => setYear(value)}
            sx={{
              color: "#278F76",
              p: "0.5rem 0.84rem",
              fontWeight: 500,
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Box>
        </Box>
        <Button
          rounded
          onClick={() =>
            navigate(
              `/app/returns/paye/create/${MONTH_INDEX_MAPPER[prevMonth]}`
            )
          }
        >
          File Return
        </Button>
      </Box>
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
                  width: '16%'
                }}
              >
                Month
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: '16%'
                }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: '16%'
                }}
              >
                Reference No
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: '16%'
                }}
              >
                No of Employees
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: '16%'
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.4rem",
                  width: '20%'
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: '16%'
                }}
              >
                April
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: '16%'
                }}
              >
                ₦100,000.00
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: '16%'
                }}
              >
                26542736
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: '16%'
                }}
              >
                35
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: '16%'
                }}
              >
                Filed
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: '20%'
                }}
              >
                <Button variant="text" sx={{ px: 0 }}>Click to file return</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MonthlyPaye;
