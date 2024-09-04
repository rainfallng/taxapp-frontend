import { MONTH_INDEX_MAPPER } from "@/lib/constants";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const theme = useTheme();
  const month = dayjs().month();
  const prevMonth = month === 0 ? 11 : month - 1;

  return (
    <Box sx={{ py: "3.2rem", px: "4.5rem" }}>
      <Box
        sx={{
          py: "2.2rem",
          px: "2.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "101rem",
          border: "1px solid #d0d0d0",
          borderRadius: "1.5rem",
          gap: "1.5rem",
          mb: "2.7rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: 500 }}>
            June 10: deadline for your tax returns for 2023 is close
          </Typography>
          <Box
            component="img"
            alt=""
            src="/assets/icons/calendar.png"
            sx={{ width: "3.3rem", height: "3.3rem" }}
          />
          <Box
            component={Link}
            to={`/app/returns/paye/create/${MONTH_INDEX_MAPPER[prevMonth]}`}
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
            Aloy Group Company Ltd.
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
                Total PAYE Filed
              </Typography>
              <Typography
                sx={{ fontSize: "3.2rem", fontWeight: 600, mb: "1.2rem" }}
              >
                ₦20,000
              </Typography>
              <Typography
                sx={{ fontSize: "1.6rem", color: theme.palette.grey[600] }}
              >
                50 Per Month
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
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHome;
