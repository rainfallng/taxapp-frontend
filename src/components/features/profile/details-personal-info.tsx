import { getValue } from "@/lib/utils";
import { useStore } from "@/store";
import { Grid, Typography, useTheme } from "@mui/material";

const DetailsMode = () => {
  const theme = useTheme();
  const user = useStore((s) => s.user);

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
          {getValue(user?.tin_profile?.first_name)}
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
          {getValue(user?.tin_profile?.last_name)}
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
          {getValue(user?.tin_profile?.middle_name)}
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
          {getValue(user?.tin_profile?.title)}
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
          {getValue(user?.tin_profile?.age)}
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
          {getValue(user?.tin_profile?.date_of_birth)}
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
          {getValue(user?.tin_profile?.marital_status)}
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
          {getValue(user?.tin_profile?.phone_number_1)}
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
          {getValue(user?.tin_profile?.email_address ?? user?.email)}
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
          {getValue(user?.tin_profile?.nationality)}
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
          {getValue(user?.tin_profile?.employment_status as unknown as string)}
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
          {getValue(user?.tin_profile?.occupation)}
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
          {getValue(user?.tin_profile?.gender)}
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
          {getValue(user?.tin_profile?.state_of_origin)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DetailsMode;
