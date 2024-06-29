import { FileUpload } from "@/components/ui/file-upload";
import { Box, FormLabel, Grid, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { IAnnualReturnStage } from "@/types/returns";

const IncomeStage: FC<{ setStage: (stage: IAnnualReturnStage) => void }> = ({
  setStage,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Typography sx={{ mb: "4rem", fontSize: "2rem", fontWeight: 500 }}>
        Statement of Income (Gross Annual Income)
      </Typography>
      <FileUpload>
        <Box sx={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <Box
            width="100%"
            sx={{
              maxWidth: "22.1rem",
              p: "1rem 2.4rem",
              color: "#278F76",
              borderRadius: "5rem",
              border: "1px solid",
              borderColor: "#278F76",
              fontSize: "1.4rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            <UploadOutlinedIcon sx={{ mr: "0.3rem" }} /> Choose file to upload
          </Box>
          <Typography sx={{ color: "#717171", fontSize: "1.4rem" }}>
            No file chosen
          </Typography>
        </Box>
      </FileUpload>
      <Grid
        container
        rowSpacing={3.2}
        columnSpacing={2.4}
        sx={{ mt: "2.4rem" }}
      >
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Salary
          </FormLabel>
          <Input name="salary" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Commission
          </FormLabel>
          <Input name="commission" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Trade Income
          </FormLabel>
          <Input name="trade_income" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Allowance
          </FormLabel>
          <Input name="allowance" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Pension
          </FormLabel>
          <Input name="pension" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Annuity
          </FormLabel>
          <Input name="annuity" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Gratuities
          </FormLabel>
          <Input name="gratuities" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Foreign Income
          </FormLabel>
          <Input name="foreign_income" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Dividend
          </FormLabel>
          <Input name="dividend" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Interest
          </FormLabel>
          <Input name="interest" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Rent
          </FormLabel>
          <Input name="rent" label="Enter Amount" />
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: "2.4rem",
          display: "flex",
          alignItems: "center",
          gap: "1.4rem",
        }}
      >
        <Typography sx={{ fontSize: "2rem" }}>Other Income(s)</Typography>
        <Button variant="text">
          <AddCircleOutlineOutlinedIcon sx={{ mr: "1.5rem" }} /> Add Income
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "4rem",
        }}
      >
        <Button
          variant="outlined"
          rounded
          onClick={() => navigate("/app/returns")}
        >
          Save Draft
        </Button>
        <Button rounded onClick={() => setStage("accomodation")}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default IncomeStage;
