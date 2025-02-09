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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../modals";

const TaxImplicationBill = ({ id, name }: { id: string; name: string }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const { user } = useStore();
  const [open, setOpen] = useState(false);
  const [params] = useSearchParams();

  const success = params.get("success");

  const fromSuccess = success === "true";

  const tinProfile = user?.company_profile;

  const { data: summary, isPending } = useQuery({
    queryKey: [QueryKeys.PAYE_SUMMARY, id],
    queryFn: () => api.getPayeSummary(id),
    enabled: !!id,
  });

  const data = summary?.data;

  const { mutateAsync: initiatePayment, isPending: paymentInitiating } =
    useMutation({
      mutationFn: api.initiatePayment,
      onSuccess(data) {
        window.open(data?.data?.authorization_url);
      },
    });

  const onInitiatePayment = () => {
    toast.promise(initiatePayment(Number(id)), {
      success: "Payment initiated",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  const amountDue = Number(data?.amount ?? "0");

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
          Bill: {name}
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
        {/* <Grid item md={4}>
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
        </Grid> */}
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
            Issue Date:
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {dayjs(data?.created_at).format("DD/MM/YYYY")}
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
            Tax Payer ID
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {tinProfile?.tax_payer_id ?? "--"}
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
            {data?.month ?? "--"}
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
            {data?.company_name ?? "--"}
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
            {data?.phone_number || "--"}
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
            {data?.email_address || "--"}
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
            ₦{Number("0").toLocaleString()}
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
        <Button
          variant="outlined"
          rounded
          sx={{ width: "50%" }}
          onClick={() => {
            if (fromSuccess) return navigate("/app/returns/success");
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button rounded sx={{ width: "50%" }} onClick={onInitiatePayment}>
          Contine
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ maxWidth: "60rem" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.6rem",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            py: "4rem",
          }}
        >
          <Box
            component="img"
            src="/assets/svgs/info-warning-gold.svg"
            alt=""
            sx={{ width: "8.8rem", height: "8.8rem" }}
          />
          <Typography
            variant="h5"
            sx={{
              fontSize: "2.6rem",
              fontWeight: 600,
              color: theme.palette.grey[800],
            }}
          >
            Crosscheck your entries
          </Typography>
          <Typography
            sx={{ fontSize: "1.6rem", color: theme.palette.grey[500] }}
          >
            Check all your information before you proceed because you will not
            be able to edit your entries after submitting
          </Typography>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="outlined"
              rounded
              sx={{ width: "50%", maxWidth: "19.5rem" }}
              onClick={() => navigate("/app/home")}
            >
              Go back
            </Button>
            <Button
              rounded
              disabled={isPending || paymentInitiating}
              sx={{ width: "50%", maxWidth: "19.5rem", ml: "1.6rem" }}
              onClick={onInitiatePayment}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TaxImplicationBill;
