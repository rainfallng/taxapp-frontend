import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { GenderType, MaritalStatusType } from "@/types";
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
      <Grid item xs={4}>
        <Input label="First Name" />
      </Grid>
      <Grid item xs={4}>
        <Input label="Last Name" />
      </Grid>
      <Grid item xs={4}>
        <Input label="Other Names" />
      </Grid>
      <Grid item xs={4}>
        <Select sx={{ height: "5.6rem" }} placeholder="Title">
          <MenuItem>Mr</MenuItem>
          <MenuItem>Mrs</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={4}>
        <DatePicker
          label="Date of Birth"
          name="date_of_birth"
          format="YYYY-MM-DD"
        />
      </Grid>
      <Grid item xs={4}>
        <Select sx={{ height: "5.6rem" }} placeholder="Marital Status">
          {Object.entries(MaritalStatusType).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <PhoneInput onChange={console.log} label="Enter Number" />
      </Grid>
      <Grid item xs={4}>
        <Input type="email" label="Email Address" />
      </Grid>
      <Grid item xs={4}>
        <Select sx={{ height: "5.6rem" }} placeholder="Nationality">
          <MenuItem>Nigerian</MenuItem>
          <MenuItem>Ghanian</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={4}>
        <Select sx={{ height: "5.6rem" }} placeholder="Employment Status">
          <MenuItem>Employed</MenuItem>
          <MenuItem>Unemployed</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={4}>
        <Input label="Occupation" />
      </Grid>
      <Grid item xs={4}>
        <Select sx={{ height: "5.6rem" }} placeholder="Gender">
          {Object.entries(GenderType).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        <Select sx={{ height: "5.6rem" }} placeholder="State of Origin">
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
