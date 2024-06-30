import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import {
  Box,
  FormLabel,
  Grid,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const AccomodationStage: FC<{
  checkSummary: () => void
}> = ({ checkSummary }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Typography sx={{ mb: "4rem", fontSize: "2rem", fontWeight: 500 }}>
        Statement of Income (Gross Annual Income)
      </Typography>
      <Grid container columnSpacing={3.2} rowSpacing={2.4}>
        <Grid item xs={12}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Address
          </FormLabel>
          <Input name="address" label="Enter Address" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Accommodation Type
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Type"
            // value={form.watch("id_type")}
            // {...form.register("id_type")}
            // errorMessage={form.formState.errors.id_type?.message}
          >
            {["Apartment", "Hotel", "Hostel"].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Ownership Type
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Type"
            // value={form.watch("id_type")}
            // {...form.register("id_type")}
            // errorMessage={form.formState.errors.id_type?.message}
          >
            {["Tenant", "Landlord", "Others"].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Owner Name
          </FormLabel>
          <Input name="owner_name" label="Enter Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Owner Taxpayer ID
          </FormLabel>
          <Input name="owner_payer_id" label="Enter Taxpayer ID" />
        </Grid>
        <Grid item xs={12}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Owner Address
          </FormLabel>
          <Input name="address" label="Enter Address" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Rent Paid
          </FormLabel>
          <Input name="rent_paid" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Rent Paid By Employer
          </FormLabel>
          <Input name="rent_paid_employer" label="Enter Amount" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Date Started
          </FormLabel>
          <DatePicker
            name="date_started"
            label=""
            format="YYYY-MM-DD"
            value={dayjs()}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Date End
          </FormLabel>
          <DatePicker
            name="date_end"
            label=""
            format="YYYY-MM-DD"
            value={dayjs()}
            disabled
          />
        </Grid>
      </Grid>
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
        <Button rounded onClick={checkSummary}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default AccomodationStage;
