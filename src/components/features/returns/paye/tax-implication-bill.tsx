import Button from "@/components/ui/button";
import GoBack from "@/components/ui/go-back";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { handleFormToastErrors, onDownloadBlob } from "@/lib/utils";
import { useStore } from "@/store";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BillSummaryPDF from "./bill-summary-pdf";
import { usePDF } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { CompanyProfile } from "@/types";
import Modal from "../../modals";

const TaxImplicationBill = ({
  billId,
  month,
}: {
  billId: string;
  month: string;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const { user } = useStore();
  const [open, setOpen] = useState(false);

  const tinProfile = user?.company_profile;

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

  const PDF = () => (
    <BillSummaryPDF
      data={data}
      tinProfile={tinProfile as CompanyProfile}
      user={user}
      amountDue={amountDue}
      month={month}
    />
  );

  const [pdfInstance, updateInstance] = usePDF({ document: <PDF /> });

  useEffect(() => {
    if (data) updateInstance(<PDF />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
          Bill: {data?.name}
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
            Tax Month in View
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            {month}
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
            {tinProfile?.name ?? "--"}
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
            {tinProfile?.phone_number || user.phone || "--"}
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
        <Button
          variant="outlined"
          rounded
          sx={{ width: "50%" }}
          onClick={() => {
            if (pdfInstance.blob)
              onDownloadBlob(pdfInstance.blob, "paye-bill-summary.pdf");
          }}
        >
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
              onClick={() => {
                if (pdfInstance.blob)
                  onDownloadBlob(pdfInstance.blob, "paye-bill-summary.pdf");
              }}
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
