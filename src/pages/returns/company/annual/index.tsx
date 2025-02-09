import Tabs from "@/components/ui/tabs";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { TABS } from "./constants";
import { useAPI } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/queryKeys";
import { useLoader } from "@/hooks/useLoader";
import {
  AnnualReturnList,
  ProjectionReturnList,
  ScheduleReturnList,
  WitholdingTaxList,
} from "@/types";
import { PREVIOUS_YEARS } from "@/lib/constants";

const AnnualReturns = () => {
  const theme = useTheme();
  const [params, setParams] = useSearchParams();
  const { api } = useAPI();
  const navigate = useNavigate();

  const activeTab = (params.get("tab") ?? "annual") as keyof typeof TABS;

  const apis = {
    annual: api.getAnnualReturns,
    projection: api.getProjectionReturns,
    witholding: api.getWitholdingTax,
    schedule: api.getScheduleReturns,
  };

  const { data: responses, isFetching } = useQuery({
    queryKey: [QueryKeys.RETURNS, QueryKeys.COMPANY, activeTab],
    queryFn: () => (apis[activeTab] as () => Promise<unknown>)(),
  });

  const annualReturns = responses as AnnualReturnList;
  const projectionReturns = responses as ProjectionReturnList;
  const withholdingTax = responses as WitholdingTaxList;
  const scheduleReturns = responses as ScheduleReturnList;

  const tabDataMapper = {
    annual: annualReturns,
    projection: projectionReturns,
    witholding: withholdingTax,
    schedule: scheduleReturns,
  };

  const data = tabDataMapper[activeTab];

  useLoader(isFetching, "Loading...");

  return (
    <Box sx={{ p: "4rem" }}>
      <Typography
        component="h3"
        sx={{ fontSize: "2.4rem", fontWeight: 600, mb: "3rem" }}
      >
        Annual Returns
      </Typography>

      <Box>
        <Tabs
          activeTab={activeTab}
          onChange={(value) => setParams({ tab: value.value })}
          options={Object.entries(TABS).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        />
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
            {data?.results?.map((return_, key) => (
              <TableRow
                key={return_.id}
                sx={{
                  ...(key % 2 === 0 && { bgcolor: "rgba(231, 231, 231, 0.4)" }),
                }}
              >
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "40%",
                  }}
                >
                  {return_.company_return.year}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "40%",
                  }}
                >
                  {return_.company_return.status}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "20%",
                  }}
                >
                  {!return_.company_return.status && (
                    <Button
                      onClick={() =>
                        navigate(
                          `/app/returns/annual/create?tab=${activeTab}&year=${return_.company_return.year}`
                        )
                      }
                    >
                      Click to file return
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {PREVIOUS_YEARS.filter(
              (year) =>
                !data?.results?.some((r) => r.company_return.year === year)
            ).map((year, key) => (
              <TableRow
                key={year}
                sx={{
                  ...(key % 2 !== 0 && {
                    bgcolor: "rgba(231, 231, 231, 0.4)",
                  }),
                }}
              >
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "40%",
                  }}
                >
                  {year}
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
                      navigate(
                        `/app/returns/annual/create?tab=${activeTab}&year=${year}`
                      )
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

export default AnnualReturns;
