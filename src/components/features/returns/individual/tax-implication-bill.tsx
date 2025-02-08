import Button from "@/components/ui/button";
import GoBack from "@/components/ui/go-back";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const TaxImplicationBill = ({ billId }: { billId: string }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const { user } = useStore();
  const { year = "" } = useParams();

  const tinProfile = user?.profile;

  const { data, isPending } = useQuery({
    queryKey: [QueryKeys.BILL, billId],
    queryFn: () => api.getBillInvoice(billId),
    enabled: !!billId,
  });

  const { mutateAsync: initiatePayment, isPending: paymentInitiating } =
    useMutation({
      mutationFn: api.initiatePayment,
      onSuccess(data) {
        window.open(data?.data?.authorization_url);
      },
    });

  const onInitiatePayment = () => {
    toast.promise(initiatePayment(Number(billId)), {
      success: "Payment initiated",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  const amountDue = Number(data?.amount ?? "0") - Number(data?.charge ?? "0");

  useLoader(isPending, "Please wait...");

  return (
    <Box sx={{ p: "4rem" }}>
      <GoBack onClick={() => navigate("/app/returns/paye")}>
        <Typography
          component="span"
          sx={{ fontSize: "2.4rem", fontWeight: 600 }}
        >
          Tax Implication Bill
        </Typography>
      </GoBack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "4.3rem",
          mt: "7rem",
        }}
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
            {data?.icode}
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
            {dayjs(data?.created).format("DD/MM/YYYY")}
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
            {/* {user.profile?.tin ?? "--"} */}
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
            {data?.tax_collector_name ?? "--"}
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
            Tax Year in View
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {year}
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
            {!user?.first_name && !user?.last_name ? (
              "--"
            ) : (
              <>
                {user?.first_name} {user?.last_name}
              </>
            )}
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
            {tinProfile?.phone_number_1 || user.phone || "--"}
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
            {tinProfile?.email_address || user.email}
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
          disabled={isPending || paymentInitiating}
          sx={{ width: "50%" }}
          onClick={onInitiatePayment}
        >
          Proceed To Payment
        </Button>
      </Box>
    </Box>
  );
};

export default TaxImplicationBill;
