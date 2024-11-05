import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { getValue } from "@/lib/utils";
import { useStore } from "@/store";
import { EmploymentStatusType } from "@/types";
import { Grid, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const DetailsMode = () => {
  const theme = useTheme();
  const user = useStore((s) => s.user);
  const { api } = useAPI();

  const tinProfile = user?.profile;

  const age =  dayjs().diff(dayjs(tinProfile?.date_of_birth))

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  useLoader(isLoadingStates, "Please wait...");

  return (
    <Grid container spacing={2} rowGap="2rem">
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          First Name
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(user?.first_name)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Surname
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(user?.last_name)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Other Names
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(user?.other_name)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Title
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(tinProfile?.title)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Age
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {tinProfile?.date_of_birth ? age : '--'}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Date of Birth
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(tinProfile?.date_of_birth)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Marital Status
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(tinProfile?.marital_status)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Phone Number
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(tinProfile?.phone_number_1)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Email Address
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(tinProfile?.email_address ?? user?.email)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Nationality
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {/* {getValue(tinProfile?.nationality)} */}
          Nigeria
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Employment Status
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(
            tinProfile?.employment_status
              ? (EmploymentStatusType as Record<string, string>)?.[
                  tinProfile?.employment_status as unknown as string
                ]
              : ""
          )}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Occupation
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(tinProfile?.occupation)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Gender
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(tinProfile?.gender)}
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          State of Origin
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
            wordBreak: "break-all",
          }}
        >
          {getValue(
            tinProfile?.state_of_origin
              ? states?.find(
                  (s) => s.id === Number(tinProfile?.state_of_origin)
                )?.name
              : ""
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DetailsMode;
