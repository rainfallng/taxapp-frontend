import Button from "@/components/ui/button";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Input from "@/components/ui/input";
import { useAPI } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/queryKeys";
import { useLoader } from "@/hooks/useLoader";
import Select, { MenuItem } from "@/components/ui/select";
import { useStore } from "@/store";
import { getValue } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { IIndividualProfile } from "@/types/form";

const AddressInfo: FC<{
  editMode: boolean;
  setEditMode: () => void;
  form: UseFormReturn<Partial<IIndividualProfile>>;
}> = ({ editMode, setEditMode, form }) => {
  const user = useStore((s) => s.user);
  const { api } = useAPI();
  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const { data: lgas, isLoading: isLoadingLgas } = useQuery({
    queryKey: [QueryKeys.LGA, form.watch("state_of_residence")],
    queryFn: () => api.getLGAs(Number(form.watch("state_of_residence"))),
    enabled: Boolean(form.watch("state_of_residence")),
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
            <Input isNumber label="Street No." name="house_number" form={form} />
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
                {getValue(user?.tin_profile?.house_number)}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item xs={3}>
          {editMode ? (
            <Input label="Street Name" name="street" form={form} />
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
                {getValue(user?.tin_profile?.street)}
              </Typography>
            </>
          )}
        </Grid>

        <Grid item xs={3}>
          {editMode ? (
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="State"
              value={form.watch("state_of_residence")}
              {...form.register("state_of_residence")}
              errorMessage={form.formState.errors.state_of_residence?.message}
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
                  user?.tin_profile?.state_of_residence
                    ? states?.find(
                        (s) =>
                          s.id === Number(user?.tin_profile?.state_of_residence)
                      )?.name
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
              value={form.watch("lga_of_residence")}
              {...form.register("lga_of_residence")}
              errorMessage={form.formState.errors.lga_of_residence?.message}
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
                  user?.tin_profile?.lga_of_residence
                    ? lgas?.find(
                        (l) =>
                          l.id === Number(user?.tin_profile?.lga_of_residence)
                      )?.name
                    : ""
                )}
              </Typography>
            </>
          )}
        </Grid>

        <Grid item md={2}>
          {editMode ? (
            <Input label="LCDA" name="lcda" form={form} />
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
                {getValue(user?.tin_profile?.lcda)}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressInfo;
