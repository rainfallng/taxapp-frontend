import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { IAnnualReturnStage } from "@/types/returns";
import { Box, FormLabel, Grid } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const IDStage: FC<{ setStage: (stage: IAnnualReturnStage) => void }> = ({
    setStage,
  }) => {
    const navigate = useNavigate();
  
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormLabel
              sx={{
                fontSize: "2rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: (theme) => theme.palette.grey[800],
              }}
            >
              Your Tax Payer ID/Tax Identification Number (TIN)
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Number"
              name="house_number"
              //   form={form}
            />
          </Grid>
          <Grid item xs={4}>
            <FormLabel
              sx={{
                fontSize: "2rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: (theme) => theme.palette.grey[800],
              }}
            >
              Year in View
            </FormLabel>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Select Year"
              // value={form.watch("id_type")}
              // {...form.register("id_type")}
              // errorMessage={form.formState.errors.id_type?.message}
            >
              {["2023", "2022"].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
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
            Cancel
          </Button>
          <Button rounded onClick={() => setStage("income")}>
            Proceed
          </Button>
        </Box>
      </>
    );
  };

  export default IDStage;