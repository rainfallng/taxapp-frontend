import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import {
  Box,
  Button,
  capitalize,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { currentYear, MONTH_INDEX_MAPPER, YEARS } from "@/lib/constants";
import dayjs from "dayjs";

const PayeReturns = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const [year, setYear] = useState(currentYear.toString());

  const months =
    year === currentYear.toString()
      ? Object.keys(MONTH_INDEX_MAPPER)
          .filter((m) => Number(m) < dayjs().month())
          .map((m) => MONTH_INDEX_MAPPER[Number(m)])
      : Object.values(MONTH_INDEX_MAPPER);

  const { data: returns, isLoading: isLoadingReturns } = useQuery({
    queryKey: [QueryKeys.COMPANY_RETURNS, year],
    queryFn: () => api.getMonthlyReturns({ year }),
  });

  useLoader(isLoadingReturns, "Fetching returns...");

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
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Box>
        </Box>
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
                    pl: "2rem",
                    width: "12%",
                  }}
                >
                  Month
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "18%",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "18%",
                  }}
                >
                  Reference No
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "16%",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "16%",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {returns?.results?.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    py: "0.7rem",
                    ...(index % 2 !== 0 && {
                      bgcolor: "#F8F8F8",
                    }),
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pl: "2rem",
                      width: "12%",
                    }}
                  >
                    {capitalize(item.month.toLowerCase())}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "18%",
                    }}
                  >
                    {item.amount
                      ? `₦${Number(item.amount).toLocaleString()}`
                      : "--"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "18%",
                    }}
                  >
                    {item.reference || "--"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "16%",
                    }}
                  >
                    {item.status}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "16%",
                    }}
                  >
                    <Button
                      onClick={() =>
                        navigate(
                          `/app/returns/paye/summary/${
                            item.id
                          }?month=${capitalize(item.month.toLowerCase())}`
                        )
                      }
                    >
                      Click to view history
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {months
                .filter(
                  (m) =>
                    !returns?.results?.some(
                      (r) =>
                        r.month.toLowerCase() === m.toLowerCase() &&
                        r.year === Number(year)
                    )
                )
                .map((month, index) => (
                  <TableRow
                    key={month}
                    sx={{
                      py: "0.7rem",
                      ...(index % 2 === 0 && {
                        bgcolor: "#F8F8F8",
                      }),
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        color: theme.palette.grey[600],
                        pl: "2rem",
                        width: "12%",
                      }}
                    >
                      {month}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        color: theme.palette.grey[600],
                        pr: "4.8rem",
                        width: "18%",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        color: theme.palette.grey[600],
                        pr: "4.8rem",
                        width: "18%",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        color: theme.palette.grey[600],
                        pr: "4.8rem",
                        width: "16%",
                      }}
                    >
                      Not Filed
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        color: theme.palette.grey[600],
                        pr: "4.8rem",
                        width: "16%",
                      }}
                    >
                      <Button
                        onClick={() =>
                          navigate(`/app/returns/paye/create/${year}/${month}`)
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
    </Box>
  );
};

export default PayeReturns;
