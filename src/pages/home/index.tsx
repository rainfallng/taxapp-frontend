import { MONTH_INDEX_MAPPER } from "@/lib/constants";
import { Box, FormLabel, Grid, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useStore } from "@/store";
import { UserType } from "@/types";
import { QueryKeys } from "@/lib/queryKeys";
import { useQueries } from "@tanstack/react-query";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { ReturnGraph, YearParam } from "@/types/returns";
import { useState } from "react";
import Select, { MenuItem } from "@/components/ui/select";

const DashboardHome = () => {
  const { user } = useStore();
  const { api } = useAPI();
  const theme = useTheme();
  const [params, setParams] = useState<YearParam>({ year: dayjs().year() });
  const [showReturnsBanner, setShowReturnsBanner] = useState(true);
  const month = dayjs().month();
  const prevMonth = month === 0 ? 11 : month - 1;

  const valueFormatter = (value: number | null) =>
    Number(value ?? "0").toLocaleString();

  const chartSetting = {
    yAxis: [
      {
        label: "Amount",
      },
    ],
    series: [{ dataKey: "amount", label: "Returns", valueFormatter }],
    height: 400,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  const isCompany = UserType.COMPANY === user.user_type;
  const companyTIN = user.company_profile;

  const [
    { data: companyGraph, isLoading: isLoadingCompanyReturnsGraph },
    { data: companyStat, isLoading: isLoadingCompanyReturnsStat },
  ] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.COMPANY_RETURNS_GRAPH, params],
        queryFn: () => api.getCompanyReturnsGraph(params),
        enabled: isCompany,
        select(data) {
          return Object.values(MONTH_INDEX_MAPPER).map((m) => {
            const findMonthData = (data as ReturnGraph[]).find(
              (v) => v.month_name === m
            );
            if (findMonthData)
              return {
                month: findMonthData.month_name,
                amount: findMonthData.amount,
              };
            return { month: m, amount: 0 };
          });
        },
      },
      {
        queryKey: [QueryKeys.COMPANY_RETURNS_STAT, params],
        queryFn: () => api.getCompanyReturnsStat(params),
        enabled: isCompany,
      },
    ],
  });

  useLoader(
    isLoadingCompanyReturnsGraph || isLoadingCompanyReturnsStat,
    "Fetching data...",
    undefined,
    isCompany
  );

  return (
    <Box sx={{ py: "3.2rem", px: "4.5rem" }}>
      <Box
        sx={{
          py: "2.2rem",
          px: "2.4rem",
          display: showReturnsBanner ? "flex" : "none",
          alignItems: "center",
          justifyContent: "space-between",
          width: "fit-content",
          minWidth: "101rem",
          maxWidth: "100%",
          border: "1px solid #d0d0d0",
          borderRadius: "1.5rem",
          gap: "1.5rem",
          mb: "2.7rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: 500 }}>
            {MONTH_INDEX_MAPPER[month]} 10: deadline for your tax returns for{" "}
            {dayjs().year()} is close
          </Typography>
          <Box
            component="img"
            alt=""
            src="/assets/icons/calendar.png"
            sx={{ width: "3.3rem", height: "3.3rem" }}
          />
          <Box
            component={Link}
            to={
              isCompany
                ? `/app/returns/paye/create/${MONTH_INDEX_MAPPER[prevMonth]}`
                : "/app/returns"
            }
            sx={{
              fontSize: "1.8rem",
              color: theme.palette.success.main,
              textDecoration: "underline",
            }}
          >
            Click to start filing your tax now
          </Box>
        </Box>
        <Box
          component="button"
          onClick={() => setShowReturnsBanner(false)}
          sx={{
            background: "transparent",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            alt=""
            src="/assets/svgs/cancel.svg"
            sx={{ width: "1.4rem", height: "1.4rem" }}
          />
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <Typography sx={{ fontSize: "3.2rem", fontWeight: 600 }}>
            <Typography
              component="span"
              sx={{ fontSize: "2.8rem", fontWeight: 400 }}
            >
              Hello,
            </Typography>{" "}
            {isCompany
              ? companyTIN?.name
              : `${user.first_name} ${user.last_name}`}
          </Typography>
          <Box
            component="img"
            alt=""
            src="/assets/svgs/person.svg"
            sx={{ width: "5.6rem", height: "5.6rem" }}
          />
        </Box>
        <Typography
          sx={{
            color: theme.palette.grey[800],
            fontSize: "1.8rem",
            mt: "1.2rem",
          }}
        >
          This is your tax app dashboard. Start or review your tax returns here.
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          borderRadius: "1.6rem",
          p: "2.4rem",
          my: "3.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ color: "#012320", fontSize: "2rem", fontWeight: 600 }}
          >
            Overview
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <FormLabel
              sx={{
                fontSize: "1.4rem",
                fontWeight: 500,
                color: "#797889",
              }}
            >
              Year&nbsp;in&nbsp;view:
            </FormLabel>
            <Select
              sx={{ height: "3.6rem" }}
              placeholder="Select Year"
              value={params?.year}
              onChange={({ target: { value } }) =>
                setParams({ year: Number(value) })
              }
            >
              {Array(5)
                .fill(dayjs().year())
                .map((val, index) => (
                  <MenuItem key={index} value={val - index}>
                    {val - index}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        </Box>
        <Grid container columnSpacing={1.6} sx={{ mt: "3.6rem" }}>
          <Grid item xs={3}>
            <Box
              sx={{
                color: "#ffffff",
                height: "15.3rem",
                bgcolor: "#000000",
                borderRadius: "1rem",
                padding: "2.4rem 1.6rem 1.1rem 1.6rem",
              }}
            >
              <Typography
                sx={{ fontSize: "1.6rem", fontWeight: 500, mb: "0.8rem" }}
              >
                Total Income
              </Typography>
              <Typography
                sx={{ fontSize: "3.2rem", fontWeight: 600, mb: "1.2rem" }}
              >
                0
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                height: "15.3rem",
                bgcolor: theme.palette.grey[50],
                borderRadius: "1rem",
                padding: "2.4rem 1.6rem 1.1rem 1.6rem",
              }}
            >
              <Typography
                sx={{ fontSize: "1.6rem", fontWeight: 500, mb: "0.8rem" }}
              >
                Deductible Expenses
              </Typography>
              <Typography
                sx={{ fontSize: "3.2rem", fontWeight: 600, mb: "1.2rem" }}
              >
                0
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                height: "15.3rem",
                bgcolor: theme.palette.grey[50],
                borderRadius: "1rem",
                padding: "2.4rem 1.6rem 1.1rem 1.6rem",
              }}
            >
              <Typography
                sx={{ fontSize: "1.6rem", fontWeight: 500, mb: "0.8rem" }}
              >
                Tax Owed
              </Typography>
              <Typography
                sx={{ fontSize: "3.2rem", fontWeight: 600, mb: "1.2rem" }}
              >
                0
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                height: "15.3rem",
                bgcolor: theme.palette.grey[50],
                borderRadius: "1rem",
                padding: "2.4rem 1.6rem 1.1rem 1.6rem",
              }}
            >
              <Typography
                sx={{ fontSize: "1.6rem", fontWeight: 500, mb: "0.8rem" }}
              >
                Total {isCompany ? "PAYE Filed" : "Annual Returns"}
              </Typography>
              <Typography
                sx={{ fontSize: "3.2rem", fontWeight: 600, mb: "1.2rem" }}
              >
                ₦{companyStat?.amount ?? 0}
              </Typography>
              <Typography
                sx={{ fontSize: "1.6rem", color: theme.palette.grey[600] }}
              >
                {companyStat?.count ?? 0} Per Month
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          borderRadius: "1.6rem",
          p: "2.4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ color: "#012320", fontSize: "1.6rem", fontWeight: 600 }}
          >
            Tax Returns
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <FormLabel
              sx={{
                fontSize: "1.4rem",
                fontWeight: 500,
                color: "#797889",
              }}
            >
              Year&nbsp;in&nbsp;view:
            </FormLabel>
            <Select
              sx={{ height: "3.6rem" }}
              placeholder="Select Year"
              value={params?.year}
              onChange={({ target: { value } }) =>
                setParams({ year: Number(value) })
              }
            >
              {Array(5)
                .fill(dayjs().year())
                .map((val, index) => (
                  <MenuItem key={index} value={val - index}>
                    {val - index}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        </Box>
        <Box>
          <BarChart
            dataset={companyGraph || []}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
              },
            ]}
            {...chartSetting}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHome;
