import SelectDropdown from "@/components/ui/menu";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
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
import { useQuery } from "@tanstack/react-query";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@/components/ui/button";
import dayjs from "dayjs";
import { MONTH_INDEX_MAPPER } from "@/lib/constants";

const PayeReturns = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const [year, setYear] = useState("2024");
  const month = dayjs().month();
  const prevMonth = month === 0 ? 11 : month - 1;

  const { data: returns, isLoading: isLoadingReturns } = useQuery({
    queryKey: [QueryKeys.COMPANY_RETURNS, year],
    queryFn: () => api.getCompanyReturns({ year }),
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
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Box>
        </Box>
        <Button
          rounded
          onClick={() => navigate(`/app/returns/paye/${MONTH_INDEX_MAPPER[prevMonth]}`)}
        >
          File Return
        </Button>
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
                    width: "20%",
                  }}
                >
                  No of Employees
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
                    {item.month}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "18%",
                    }}
                  >
                    {item.amount}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "18%",
                    }}
                  >
                    {item.icode}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "20%",
                    }}
                  >
                    {item.number_of_employees}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "16%",
                    }}
                  >
                    {item.is_active ? "Filed" : "Not Filed"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      color: theme.palette.grey[600],
                      pr: "4.8rem",
                      width: "16%",
                    }}
                  >
                    <SelectDropdown
                      options={[
                        item.is_active
                          ? {
                              name: "Statement of Income",
                              onClick: () =>
                                navigate(`/app/returns/paye/${year}`),
                            }
                          : {
                              name: "File Return",
                              onClick: () =>
                                navigate(`/app/returns/paye/${item.month}`),
                            },
                      ]}
                    >
                      <MoreVertIcon />
                    </SelectDropdown>
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
