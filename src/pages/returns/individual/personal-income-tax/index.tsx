import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { PREVIOUS_YEARS } from "@/lib/constants";
import { QueryKeys } from "@/lib/queryKeys";
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
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PersonalIncomeTax = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();

  const { data, isPending } = useQuery({
    queryKey: [QueryKeys.RETURNS, "history"],
    queryFn: api.getIndividualReturns,
  });

  useLoader(isPending, "Fetching history...");

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
            {PREVIOUS_YEARS.filter(
              (y) => !data?.results?.some((res) => res.year_in_view === y)
            ).map((y, key) => (
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
            {data?.results?.map((res, key) => (
              <TableRow
                key={res.id}
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
                  {res.year_in_view}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "40%",
                  }}
                >
                  {res.status}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "20%",
                  }}
                >
                  <Button
                    disabled={Boolean(res.income) && Boolean(res.accommodation)}
                    onClick={() => {
                      if (!res.income || !res.accommodation)
                        return navigate(
                          `/app/returns/personal-income-tax/${res.id}/${
                            res.year_in_view
                          }?stage=${!res.income ? "income" : "accomodation"}`
                        );
                    }}
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
