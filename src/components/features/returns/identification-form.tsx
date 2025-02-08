import Button from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormLabel, Grid, Box } from "@mui/material";
import Input from "@/components/ui/input";
import {
  postReturnSchema,
  postReturnSchemaObject,
} from "@/lib/schemas/returns/post-return";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Select, { MenuItem } from "@/components/ui/select";
import { useEffect } from "react";
import { YEARS } from "@/lib/constants";
import { useStore } from "@/store";

const IdentificationForm = ({
  onSubmit,
}: {
  onSubmit: (data: yup.InferType<typeof postReturnSchemaObject>) => void;
}) => {
  const navigate = useNavigate();
  const form = useForm(postReturnSchema);
  const [params] = useSearchParams();
  const user = useStore((state) => state.user);

  const year = params.get("year");

  useEffect(() => {
    form.reset({ year_in_view: year || "", tin: user?.company_profile?.tax_payer_id || user?.profile?.tax_payer_id || "123" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
            Your Tax Payer ID
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter Number"
            name="tin"
            form={form}
            disabled
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
            value={form.watch("year_in_view")}
            {...form.register("year_in_view")}
            errorMessage={form.formState.errors.year_in_view?.message}
          >
            {YEARS.map((val) => (
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
        <Button type="submit" rounded>
          Proceed
        </Button>
      </Box>
    </form>
  );
};

export default IdentificationForm;
