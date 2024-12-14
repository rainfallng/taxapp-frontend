import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import {
  EmploymentStatusType,
  GenderType,
  MaritalStatusType,
  TitleType,
} from "@/types";
import { Grid, capitalize } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { individualProfileSchema } from "@/lib/schemas/profile/individual-profile";

const EditMode: FC<{
  form: UseFormReturn<Partial<typeof individualProfileSchema.defaultValues>>;
}> = ({ form }) => {
  const { api } = useAPI();
  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  useLoader(isLoadingStates, "Please wait...");

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="Title"
          value={form.watch("title")}
          {...form.register("title")}
          errorMessage={form.formState.errors.title?.message}
        >
          {Object.entries(TitleType).map(([key, val]) => (
            <MenuItem key={key} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="Marital Status"
          value={form.watch("marital_status")}
          {...form.register("marital_status")}
          errorMessage={form.formState.errors.marital_status?.message}
        >
          {Object.entries(MaritalStatusType).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <PhoneInput
          value={form.watch("phone_number_1")}
          onChange={(value) => form.setValue("phone_number_1", value)}
          errorMessage={form.formState.errors.phone_number_1?.message}
          label="Enter Number"
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          type="email"
          label="Email Address"
          name="email_address"
          form={form}
        />
      </Grid>
      <Grid item xs={4}>
        <Input label="Nationality" />
      </Grid>
      <Grid item xs={4}>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="Employment Status"
          value={form.watch("employment_status")}
          {...form.register("employment_status")}
          errorMessage={form.formState.errors.employment_status?.message}
        >
          {Object.entries(EmploymentStatusType).map(([key, val]) => (
            <MenuItem key={key} value={capitalize(key)}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <Input label="Occupation" name="occupation" form={form} />
      </Grid>
      <Grid item xs={4}>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="Gender"
          value={form.watch("gender")}
          {...form.register("gender")}
          errorMessage={form.formState.errors.gender?.message}
        >
          {Object.entries(GenderType).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="State of Origin"
          value={form.watch("state_of_origin")}
          {...form.register("state_of_origin")}
          errorMessage={form.formState.errors.state_of_origin?.message}
        >
          {states?.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default EditMode;
