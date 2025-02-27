import Button from "@/components/ui/button";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Input from "@/components/ui/input";
import { useAPI } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/queryKeys";
import { useLoader } from "@/hooks/useLoader";
import Select, { MenuItem } from "@/components/ui/select";
import { useStore } from "@/store";
import { getValue } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { CompanyProfile, IndividualProfile, UserType } from "@/types";

interface AddressInfoProps<T extends FieldValues> {
  editMode: boolean;
  setEditMode: () => void;
  form: UseFormReturn<T>;
}

const AddressInfo = <T extends FieldValues>({
  editMode,
  setEditMode,
  form,
}: AddressInfoProps<T>) => {
  const { user, tenantName } = useStore();
  const { api } = useAPI();

  const isCompany = user.user_type === UserType.COMPANY;

  const isIndividual = user.user_type === UserType.INDIVIDUAL;

  const tinProfile = isIndividual ? user?.profile : user?.company_profile;

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const lgaKey = isCompany ? "lga" : "lga_of_residence";

  const stateKey = isCompany ? "state" : "state_of_residence";

  const lgaValue = isCompany
    ? (tinProfile as CompanyProfile)?.lga
    : (tinProfile as IndividualProfile)?.lga_of_residence;

  const stateValue = isCompany
    ? (tinProfile as CompanyProfile)?.state
    : (tinProfile as IndividualProfile)?.state_of_residence;

  const state = editMode ? form.watch(stateKey as Path<T>) : stateValue;

  const { data: lgas, isLoading: isLoadingLgas } = useQuery({
    queryKey: [QueryKeys.LGA, state],
    queryFn: () => api.getLGAs(Number(state)),
    enabled: !!state,
  });
  const theme = useTheme();

  useLoader(isLoadingStates || isLoadingLgas, "Please wait...");

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: theme.palette.grey[50],
        px: "1.45rem",
        py: "3.2rem",
        borderRadius: "1rem",
        mt: "2.4rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "2.4rem",
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            color: theme.palette.grey[900],
          }}
        >
          Address Information
        </Typography>
        {!editMode && (
          <Button
            variant="text"
            sx={{ fontSize: "1.4rem", color: theme.palette.grey[600] }}
            onClick={setEditMode}
          >
            <EditOutlinedIcon sx={{ fontSize: "1.4rem", mr: "0.8rem" }} /> Edit
          </Button>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {editMode ? (
            <Input
              isNumber
              label="Street No."
              name={"street_number" as Path<T>}
              form={form}
            />
          ) : (
            <>
              <Typography
                sx={{
                  color: theme.palette.grey[400],
                  fontSize: "1.8rem",
                  mb: "0.8rem",
                }}
              >
                Street No.
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  color: theme.palette.grey[800],
                  fontWeight: 500,
                }}
              >
                {/* {getValue(tinProfile?.street_number)} */}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item xs={3}>
          {editMode ? (
            <Input
              label="Street Name"
              name={"street_name" as Path<T>}
              form={form}
            />
          ) : (
            <>
              <Typography
                sx={{
                  color: theme.palette.grey[400],
                  fontSize: "1.8rem",
                  mb: "0.8rem",
                }}
              >
                Street Name
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  color: theme.palette.grey[800],
                  fontWeight: 500,
                }}
              >
                {/* {getValue(tinProfile?.street_name)} */}
              </Typography>
            </>
          )}
        </Grid>

        <Grid item xs={3}>
          {editMode ? (
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="State"
              value={form.watch(stateKey as Path<T>)}
              {...form.register(stateKey as Path<T>)}
              errorMessage={
                form.formState.errors.state_of_residence?.message as string
              }
            >
              {states?.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <>
              <Typography
                sx={{
                  color: theme.palette.grey[400],
                  fontSize: "1.8rem",
                  mb: "0.8rem",
                }}
              >
                State
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  color: theme.palette.grey[800],
                  fontWeight: 500,
                }}
              >
                {getValue(
                  stateValue
                    ? states?.find((s) => s.id === Number(stateValue))?.name
                    : ""
                )}
              </Typography>
            </>
          )}
        </Grid>

        <Grid item xs={3}>
          {editMode ? (
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="LGA"
              value={form.watch(lgaKey as Path<T>)}
              {...form.register(lgaKey as Path<T>)}
              errorMessage={
                form.formState.errors.lga_of_residence?.message as string
              }
            >
              {lgas?.map((lga) => (
                <MenuItem key={lga.id} value={lga.id}>
                  {lga.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <>
              <Typography
                sx={{
                  color: theme.palette.grey[400],
                  fontSize: "1.8rem",
                  mb: "0.8rem",
                }}
              >
                LGA
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  color: theme.palette.grey[800],
                  fontWeight: 500,
                }}
              >
                {getValue(
                  lgaValue
                    ? lgas?.find((l) => l.id === Number(lgaValue))?.name
                    : ""
                )}
              </Typography>
            </>
          )}
        </Grid>

        {tenantName !== "fct" && (
          <Grid item md={2}>
            {editMode ? (
              <Input label="LCDA" name={"lcda" as Path<T>} form={form} />
            ) : (
              <>
                <Typography
                  sx={{
                    color: theme.palette.grey[400],
                    fontSize: "1.8rem",
                    mb: "0.8rem",
                  }}
                >
                  LCDA
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    color: theme.palette.grey[800],
                    fontWeight: 500,
                    wordBreak: "break-all",
                  }}
                >
                  {getValue(tinProfile?.lcda)}
                </Typography>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AddressInfo;
