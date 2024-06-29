import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const EditMode = () => {
  const { api } = useAPI();
  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  useLoader(isLoadingStates, "Please wait...");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Input label="Company Name" />
      </Grid>
      <Grid item xs={6}>
      <Select sx={{ height: "5.6rem" }} placeholder="Principal Place of Business">
          {states?.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Input label="No of Employees" />
      </Grid>
      <Grid item xs={6}>
        <Input label="No of Directors" />
      </Grid>
      <Grid item xs={6}>
        <Select sx={{ height: "5.6rem" }} placeholder="Business Type">
          <MenuItem>Mr</MenuItem>
          <MenuItem>Mrs</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Input type="email" label="Email Address" />
      </Grid>
      <Grid item xs={6}>
        <PhoneInput onChange={console.log} label="Enter Number" />
      </Grid>
    </Grid>
  );
};

export default EditMode;
