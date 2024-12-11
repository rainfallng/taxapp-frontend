import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { CompanyProfileUpdate } from "@/types";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const EditMode = ({ form }: { form: CompanyProfileUpdate }) => {
  const { api } = useAPI();
  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  useLoader(isLoadingStates, "Please wait...");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Input label="Company Name" form={form} name="name" />
      </Grid>
      <Grid item xs={6}>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="Principal Place of Business"
        >
          {states?.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Input label="No of Employees" form={form} name="number_of_employees" />
      </Grid>
      <Grid item xs={6}>
        <Input label="No of Directors" form={form} name="number_of_directors" />
      </Grid>
      <Grid item xs={6}>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="Business Type"
          value={form.watch("business_type")}
          onChange={({ target: { value } }) =>
            form.setValue("business_type", value as string)
          }
          errorMessage={form.formState.errors?.business_type?.message}
        >
          {[
            "NGO",
            "Cooperative",
            "Sole proprietorship",
            "Limited Liability Company",
          ].map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Input type="email" label="Email Address" form={form} name="email" />
      </Grid>
      <Grid item xs={6}>
        <PhoneInput
          value={form.watch("phone_number")}
          onChange={(value) => form.setValue("phone_number", value)}
          errorMessage={form.formState.errors.phone_number?.message}
        />
      </Grid>
    </Grid>
  );
};

export default EditMode;
