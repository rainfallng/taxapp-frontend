import Button from "@/components/ui/button";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { useStore } from "@/store";
import { ICompanyProfile } from "@/types";
import { Box, capitalize, Grid, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

const TaxImplicationBill = ({ billId }: { billId: string }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const { user } = useStore();
  const { month = "" } = useParams();

  const tinProfile = user?.tin_profile as ICompanyProfile;

  const { data, isPending } = useQuery({
    queryKey: [QueryKeys.BILL, billId],
    queryFn: () => api.getBillInvoice(billId),
    enabled: !!billId,
  });

  const amountDue = Number(data?.amount ?? "0") - Number(data?.charge ?? "0")

  useLoader(isPending, "Please wait...")

  return (
    <Box sx={{ p: "4rem" }}>
      <Typography
        component="h3"
        sx={{ fontSize: "2.4rem", fontWeight: 600, mb: "7.5rem" }}
      >
        Tax Implication Bill
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "4.3rem" }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[800],
            fontSize: "2.2rem",
            fontWeight: 500,
          }}
        >
          Bill: Annual Returns Filing
        </Typography>
        <Typography
          sx={{
            color: theme.palette.grey[800],
            fontSize: "2.2rem",
            fontWeight: 500,
          }}
        >
          Tax Implication Total: ₦{Number(data?.amount ?? "0").toLocaleString()}
        </Typography>
      </Box>
      <Grid container columnSpacing={2} rowSpacing="4.8rem">
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Reference Number:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {data?.reference}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Issue Date:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {dayjs(data?.created).format('DD/MM/YYYY')}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Tax Payer ID/Tax Identification Number (TIN)
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {tinProfile?.tin ?? '--'}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Biller:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            LIRS
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Tax Month in View
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {capitalize(month)}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Customer Name:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {tinProfile?.name}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Surcharge:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            ₦{Number(data?.charge ?? "0").toLocaleString()}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Phone Number:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {tinProfile?.phone_number}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: "1.4rem",
              fontWeight: 500,
              mb: "0.8rem",
            }}
          >
            Customer Email Address:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {tinProfile?.email || user.email}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        sx={{
          fontSize: "2.6rem",
          color: theme.palette.grey[800],
          fontWeight: 500,
          mt: "5rem",
        }}
      >
        Amount Due: ₦{amountDue.toLocaleString()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "8rem",
        }}
      >
        <Button variant="outlined" rounded sx={{ width: "50%" }}>
          Download Bill
        </Button>
        <Button
          rounded
          disabled={isPending}
          sx={{ width: "50%" }}
          onClick={() => navigate("/app/returns/paye")}
        >
          Proceed To Payment
        </Button>
      </Box>
    </Box>
  );
};

export default TaxImplicationBill;
