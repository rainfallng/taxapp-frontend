import Button from "@/components/ui/button";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaxImplicationBill = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
          Tax Implication Total: ₦12,845.00
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
            2345129084783930
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
            15/06/2024
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
            TIN-98763
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
            Tax Year in View
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              color: theme.palette.grey[800],
            }}
          >
            2023
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
            Agbor Osade Wilfred
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
            ₦70.00
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
            +234 901 2345 678
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
            agbor@osade.com
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
        Amount Due: N12,915.00
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
          sx={{ width: "50%" }}
          onClick={() => navigate("/app/returns/history")}
        >
          Proceed To Payment
        </Button>
      </Box>
    </Box>
  );
};

export default TaxImplicationBill;
